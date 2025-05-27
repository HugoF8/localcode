#include <iostream>
#include <string>
#include <chrono>
#include <opencv2\opencv.hpp>
#include <opencv2\core.hpp>
#include <opencv2\highgui.hpp>
#include <opencv2\videoio.hpp>
#include <vector>

#define _USE_MATH_DEFINES
#include <math.h>
#ifndef M_PI
#endif

extern "C" {
#include "vc.h"
}

void vc_timer(void) {
	static bool running = false;
	static std::chrono::steady_clock::time_point previousTime = std::chrono::steady_clock::now();

	if (!running) {
		running = true;
	}
	else {
		std::chrono::steady_clock::time_point currentTime = std::chrono::steady_clock::now();
		std::chrono::steady_clock::duration elapsedTime = currentTime - previousTime;

		std::chrono::duration<double> time_span = std::chrono::duration_cast<std::chrono::duration<double>>(elapsedTime);
		double nseconds = time_span.count();

		std::cout << "Tempo decorrido: " << nseconds << "segundos" << std::endl;
		std::cout << "Pressione qualquer tecla para continuar...\n";
		std::cin.get();
	}
}

// Display das estatísticas do frame
void display(cv::Mat& frame, int total_moedas, int contagem_moedas[], float valor_total) {

	std::string str;
	int y_offset = 150;

	// Total de moedas
	str = std::string("TOTAL MOEDAS: ").append(std::to_string(total_moedas));
	cv::putText(frame, str, cv::Point(20, y_offset), cv::FONT_HERSHEY_SIMPLEX, 0.7, cv::Scalar(0, 0, 0), 2);
	cv::putText(frame, str, cv::Point(20, y_offset), cv::FONT_HERSHEY_SIMPLEX, 0.7, cv::Scalar(255, 0, 0), 1);

	// Contagem por tipo
	const char* types[] = { "1c", "2c", "10c", "5c", "20c", "1E", "50c", "2E" };
	for (int i = 0; i < 8; i++) {
		y_offset += 25;
		str = std::string(types[i]).append(": ").append(std::to_string(contagem_moedas[i]));
		cv::putText(frame, str, cv::Point(40, y_offset), cv::FONT_HERSHEY_SIMPLEX, 0.6, cv::Scalar(0, 0, 0), 2);
		cv::putText(frame, str, cv::Point(40, y_offset), cv::FONT_HERSHEY_SIMPLEX, 0.6, cv::Scalar(255, 0, 0), 1);
	}

	// Valor total
	y_offset += 30;
	str = std::string("VALOR TOTAL: ").append(std::to_string(valor_total)).append(" €");
	cv::putText(frame, str, cv::Point(20, y_offset), cv::FONT_HERSHEY_SIMPLEX, 0.7, cv::Scalar(0, 0, 0), 2);
	cv::putText(frame, str, cv::Point(20, y_offset), cv::FONT_HERSHEY_SIMPLEX, 0.7, cv::Scalar(255, 0, 0), 1);
}

int main(void) {

	// Vídeo
	char videofile[20] = "video1.mp4";
	cv::VideoCapture capture;

	struct
	{
		int width, height;
		int ntotalframes;
		int fps;
		int nframe;
	} video;

	std::string str;
	int key = 0;

	// Captura de vídeo
	capture.open(videofile);
	if (!capture.isOpened())
	{
		std::cerr << "Erro ao abrir o ficheiro de vídeo!\n";
		return 1;
	}

	// Propriedades do vídeo
	video.ntotalframes = (int)capture.get(cv::CAP_PROP_FRAME_COUNT);
	video.fps = (int)capture.get(cv::CAP_PROP_FPS);
	video.width = (int)capture.get(cv::CAP_PROP_FRAME_WIDTH);
	video.height = (int)capture.get(cv::CAP_PROP_FRAME_HEIGHT);

	// Criação da janela
	cv::namedWindow("VC - VIDEO", cv::WINDOW_AUTOSIZE);

	// Inicia o timer
	vc_timer();

	// Estrutura para guardar a cada moeda analisada
	struct moedaVista {
		cv::Point position;
		int type;
		int ttl; // tempo restante de número de frames
		int max_ttl; // tempo máximo de vida
		int seen_frames = 0;
	};

	// Vetor com todas as moedas ativas que estão a ser analisadas
	std::vector<moedaVista> moedas_vistas;
	int total_moedas = 0;
	int contagem_moedas[8] = { 0 };
	float valor_total = 0.0f;

	const float DISTANCE_THRESHOLD = 85.0f; // Distância máxima para concluir que é a mesma moeda entre frame
	const int MAX_TTL = 15;

	cv::Mat frame;
	while (key != 'q') {

		// Leitura de um frame do vídeo
		capture.read(frame);

		// Verifica se conseguiu ler a frame
		if (frame.empty()) break;

		// Número da frame atual
		video.nframe = (int)capture.get(cv::CAP_PROP_POS_FRAMES);

		// Processamento da imagem
		IVC* image = vc_image_new(video.width, video.height, 3, 255);
		memcpy(image->data, frame.data, video.width * video.height * 3);

		// Conversão de BGR para RGB
		vc_bgr_to_rgb(image);

		// Conversão de RGB para HSV
		IVC* hsv_image = vc_image_new(video.width, video.height, 3, 255);
		memcpy(hsv_image->data, image->data, video.width * video.height * 3);
		vc_rgb_to_hsv(hsv_image);

		cv::Mat hsvMat(hsv_image->height, hsv_image->width, CV_8UC3, hsv_image->data);
		// Aplica blur para suavizar ruídos
		cv::GaussianBlur(hsvMat, hsvMat, cv::Size(9, 9), 5);

		// Segmentação de cores HSV
		// 1) Segmentação das moedas bronze
		IVC* moedasbronze = vc_image_new(video.width, video.height, 1, 255);
		vc_hsv_segmentation(hsv_image, moedasbronze, 20, 38, 35, 79, 13, 80);

		// 2) Segmentação das moedas prateadas
		IVC* moedasprateado = vc_image_new(video.width, video.height, 1, 255);
		vc_hsv_segmentation(hsv_image, moedasprateado, 50, 155, 0, 16, 10, 40);

		// 3) Segmentação das moedas douradas
		IVC* moedasdourado = vc_image_new(video.width, video.height, 1, 255);
		vc_hsv_segmentation(hsv_image, moedasdourado, 25, 86, 13, 60, 18, 70);

		// 4) Segmentação do fundo do video
		IVC* background = vc_image_new(video.width, video.height, 1, 255);
		vc_hsv_segmentation(hsv_image, background, 10, 55, 1, 38, 48, 85);

		// Combinação das segmentações
		IVC* moedas = vc_image_new(video.width, video.height, 1, 255);
		for (int i = 0; i < video.width * video.height; i++) {
			unsigned char value = 0;

			// Se o pixel identificar a cor de moeda, marca esse pixel com o valor de 255
			if (moedasdourado->data[i] == 255 || moedasprateado->data[i] == 255 || moedasbronze->data[i] == 255) {
				value = 255;
			}

			// Se o pixel identificar a cor de fundo do video, marca esse pixel com o valor de 0
			if (background->data[i] == 255) {
				value = 0;
			}
			moedas->data[i] = value;
		}

		// Operador (dilatação) usado para eliminar algum alguns pequenos buracos
		vc_binary_dilate_tunado(moedas, moedas, 5, 12);

		// Rotula blobs
		IVC* blob_image = vc_image_new(video.width, video.height, 1, 255);
		memcpy(blob_image->data, moedas->data, video.width * video.height);
		int nlabels;
		OVC* blobs = vc_binary_blob_labelling(moedas, blob_image, &nlabels);

		// Vetor que armazenará as posições das moedas detectadas no frame
		std::vector<cv::Point> current_frame_moedas;

		// Se houver blobs identificados 
		if (blobs != NULL && nlabels > 0) {
			vc_binary_blob_info(blob_image, blobs, nlabels);

			// Atualiza o TTL de todas as moedas analisadas
			for (auto& moeda : moedas_vistas) {
				moeda.ttl--;
			}

			// Remove do vetor "moedas_vistas", aquelas cujo TTL atingiu zero
			moedas_vistas.erase(
				std::remove_if(moedas_vistas.begin(), moedas_vistas.end(),
					[](const moedaVista& moeda) { return moeda.ttl <= 0; }),
				moedas_vistas.end());

			// Processa blobs
			for (int i = 0; i < nlabels; i++) {
				float raio = (blobs[i].perimetro / (2 * M_PI));
				float circularidade = (4 * M_PI * blobs[i].area) / (blobs[i].perimetro * blobs[i].perimetro);

				if (circularidade > 1.05 && raio > 50 && raio < 100 && blobs[i].area < 29000) {

					// Ignorar detecções muito próximas das bordas horizontais
					const int MARGEM = 250;
					if (blobs[i].yc < MARGEM || blobs[i].yc > video.height - MARGEM) {
						continue;
					}

					// Centróide da moeda atual
					cv::Point moeda_atual(blobs[i].xc, blobs[i].yc);
					int tipo_moeda = moeda_por_area(blobs[i].area);

					// Verificar se esta moeda corresponde a uma já analisada
					bool existe_moeda = false;
					for (auto& moeda_vista : moedas_vistas) {
						float distance = std::sqrt(std::pow(moeda_atual.x - moeda_vista.position.x, 2) +
							std::pow(moeda_atual.y - moeda_vista.position.y, 2));

						if (distance < DISTANCE_THRESHOLD) {
							// Atualizar posição e ttl
							moeda_vista.position = moeda_atual;
							moeda_vista.ttl = moeda_vista.max_ttl;
							existe_moeda = true;
							break;
						}
					}

					// Se não encontrar correspondência, considera que é uma nova moeda
					if (!existe_moeda) {
						moedaVista nova_moeda;
						nova_moeda.position = moeda_atual;
						nova_moeda.type = tipo_moeda;
						nova_moeda.ttl = MAX_TTL;
						nova_moeda.max_ttl = MAX_TTL;
						moedas_vistas.push_back(nova_moeda);

						// Incrementa contadores
						total_moedas++;
						contagem_moedas[tipo_moeda]++;
						valor_total += get_valor_moeda(tipo_moeda);
					}

					// Desenha no vídeo o retângulo e centróide nas moedas
					cv::Scalar color = existe_moeda ? cv::Scalar(255, 0, 0) : cv::Scalar(0, 255, 0);
					cv::rectangle(frame,
						cv::Point(blobs[i].x, blobs[i].y),
						cv::Point(blobs[i].x + blobs[i].width, blobs[i].y + blobs[i].height),
						color, 2);

					cv::circle(frame,
						cv::Point(blobs[i].xc, blobs[i].yc), 5, cv::Scalar(0, 0, 255),
						-1);

					// Desenha informações sobre as moedas
					std::string moeda_text = get_moeda_text(tipo_moeda);
					std::string area_text = std::to_string(blobs[i].area);
					std::string raio_text = std::to_string(raio);
					std::string perimetro_text = std::to_string(blobs[i].perimetro);
					std::string circularidade_text = std::to_string(circularidade);

					cv::putText(frame, moeda_text, cv::Point(blobs[i].x, blobs[i].y - 45),
						cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255, 255, 255), 1);

					cv::putText(frame, "Area: " + area_text, cv::Point(blobs[i].x, blobs[i].y - 30),
						cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255, 255, 255), 1);

					cv::putText(frame, "Raio: " + raio_text, cv::Point(blobs[i].x, blobs[i].y - 15),
						cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255, 255, 255), 1);

					cv::putText(frame, "Perimetro: " + perimetro_text, cv::Point(blobs[i].x, blobs[i].y - 60),
						cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255, 255, 255), 1);

					cv::putText(frame, "Circularidade: " + circularidade_text, cv::Point(blobs[i].x, blobs[i].y - 80),
						cv::FONT_HERSHEY_SIMPLEX, 0.5, cv::Scalar(255, 255, 255), 1);
				}
			}

			// Exibe as estatísticas após processar todos os blobs
			display(frame, total_moedas, contagem_moedas, valor_total);
		}

		// Liberta a memória alocada 
		if (blobs != NULL) {
			free(blobs);
		}

		// Liberar memória
		vc_image_free(image);
		vc_image_free(hsv_image);
		vc_image_free(moedasbronze);
		vc_image_free(moedasprateado);
		vc_image_free(moedasdourado);
		vc_image_free(moedas);
		vc_image_free(blob_image);

		str = std::string("RESOLUCAO: ").append(std::to_string(video.width)).append("x").append(std::to_string(video.height));
		cv::putText(frame, str, cv::Point(20, 25), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(0, 0, 0), 2);
		cv::putText(frame, str, cv::Point(20, 25), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(255, 0, 0), 1);
		str = std::string("TOTAL DE FRAMES: ").append(std::to_string(video.ntotalframes));
		cv::putText(frame, str, cv::Point(20, 50), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(0, 0, 0), 2);
		cv::putText(frame, str, cv::Point(20, 50), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(255, 0, 0), 1);
		str = std::string("FRAME RATE: ").append(std::to_string(video.fps));
		cv::putText(frame, str, cv::Point(20, 75), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(0, 0, 0), 2);
		cv::putText(frame, str, cv::Point(20, 75), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(255, 0, 0), 1);
		str = std::string("N. DA FRAME: ").append(std::to_string(video.nframe));
		cv::putText(frame, str, cv::Point(20, 100), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(0, 0, 0), 2);
		cv::putText(frame, str, cv::Point(20, 100), cv::FONT_HERSHEY_SIMPLEX, 1.0, cv::Scalar(255, 0, 0), 1);

		// Exibe os frames da janela VC - VIDEO 
		cv::imshow("VC - VIDEO", frame);

		// Sai da aplicação, se o utilizador premir a tecla 'q'
		key = cv::waitKey(1);
	}

	// Para o timer e exibe o tempo decorrido
	vc_timer();

	// Fecha a janela e liberta a captura
	cv::destroyWindow("VC - VIDEO");
	capture.release();

	return 0;
}