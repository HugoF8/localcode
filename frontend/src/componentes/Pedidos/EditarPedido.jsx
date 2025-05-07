import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/CriarFreguesia.css';

function EditarPedidoC() {
  const [documentos, setDocumentos] = useState([]);
  const [dadosPedido, setDadosPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID do pedido da URL

  useEffect(() => {
    // Recuperar os dados do pedido do localStorage
    const pedidoSalvo = localStorage.getItem('pedidoParaEditar');
    
    if (pedidoSalvo) {
      const pedido = JSON.parse(pedidoSalvo);
      setDadosPedido(pedido);
      
      // Simular carregamento dos documentos existentes
      // Na implementação real, você buscaria os documentos da API
      if (pedido.dados_comprovacao) {
        setDocumentos([
          { 
            name: pedido.dados_comprovacao, 
            size: 150000, // Tamanho fictício
            isExisting: true // Marcar como documento existente
          }
        ]);
      }
    } else {
      // Se não houver dados no localStorage, buscar da API
      buscarDadosPedido(id);
    }
    
    setCarregando(false);
  }, [id]);

  // Função para buscar dados do pedido da API (simulada)
  const buscarDadosPedido = async (idPedido) => {
    try {
   
      // const response = await fetch(`http://localhost:3000/pedidos/${idPedido}`);
      // const data = await response.json();
      
      //dados para teste
      const pedidoEncontrado = mockPedidos.find(p => p.id_pedido.toString() === idPedido);
      
      if (pedidoEncontrado) {
        setDadosPedido(pedidoEncontrado);
        
        if (pedidoEncontrado.dados_comprovacao) {
          setDocumentos([
            { 
              name: pedidoEncontrado.dados_comprovacao, 
              size: 150000,
              isExisting: true 
            }
          ]);
        }
      } else {
        toast.error('Pedido não encontrado');
        navigate('');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do pedido:', error);
      toast.error('Erro ao carregar dados do pedido');
    }
  };

  const handleFileChange = (e) => {
    const novosFicheiros = Array.from(e.target.files);
    setDocumentos((prev) => [...prev, ...novosFicheiros]);
  };

  const removerDocumento = (index) => {
    setDocumentos(prev => prev.filter((_, i) => i !== index));
  };


  //submeter as alterações 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
      id_pedido: dadosPedido.id_pedido,
      nomefreguesia: document.getElementById('nome').value,
      localizacao: document.getElementById('localizacao').value,
      descricao: document.getElementById('descricao').value,
      id_utilizador: parseInt(localStorage.getItem('id_utilizador')), 
      id_morada: parseInt(localStorage.getItem('id_morada')),        
      estado_pedido: 'pendente' // Volta para pendente após edição
    };

    try {
      
      // const response = await fetch(`http://localhost:3000/pedidos/atualizar/${dadosPedido.id_pedido}`, {
      //   method: 'Patch',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(dadosAtualizados)
      // });
      
      // Simulando resposta bem-sucedida
      toast.success('Pedido de freguesia atualizado com sucesso!');
      navigate('');
      
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      toast.error('Erro ao atualizar o pedido. Tente novamente.');
    }
  };

  if (carregando) {
    return <div className="loading">Carregando dados do pedido...</div>;
  }

  if (!dadosPedido) {
    return <div className="error">Pedido não encontrado</div>;
  }

  return (
        <div className="conteudo-criar">
          <ToastContainer position="top-right" />
          <h2>Editar Pedido de Freguesia</h2>
          <hr />
          <form className="formulario" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome da Freguesia</label>
            <input 
              type="text" 
              id="nome" 
              placeholder="Nome da freguesia" 
              defaultValue={dadosPedido.nomefreguesia}
              required 
            />

            <label htmlFor="Cidade">Cidade</label>
            <input 
              type="text" 
              id="cidade" 
              placeholder="cidade" 
              defaultValue={dadosPedido.morada?.cidade || ''}
              required 
            />

            <label htmlFor="Freguesia">Freguesia</label>
            <input 
              type="text" 
              id="freguesia" 
              placeholder="freguesia" 
              defaultValue={dadosPedido.morada?.freguesia || ''}
              required 
            />

            <label htmlFor="Rua">Rua</label>
            <input 
              type="text" 
              id="rua" 
              placeholder="rua" 
              defaultValue={dadosPedido.morada?.rua || ''}
              required 
            />


            <label htmlFor="documentos">Documentos necessários <span title="Documentos obrigatórios">ℹ️</span></label>
            <div className="upload-box">
              <label htmlFor="documentos-upload" className="upload-label">
                <span className="plus">+</span>
                <p>Anexe os documentos necessários</p>
                <input
                  type="file"
                  id="documentos-upload"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </label>

              {documentos.length > 0 && (
                <div className="preview-documentos-inside">
                  {documentos.map((file, index) => (
                    <div key={index} className="documento-card">
                      <div className="documento-info">
                        <span className="documento-nome">{file.name}</span>
                        <span className="documento-tamanho">
                          {file.isExisting 
                            ? 'Documento existente' 
                            : `${(file.size / 1024).toFixed(1)} KB`}
                        </span>
                        <button 
                          type="button" 
                          onClick={() => removerDocumento(index)} 
                          className="btn-remover"
                        >
                          ✖️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="botoes-acao">
              <button 
                type="button" 
                className="btn-cancelar"
                onClick={() => navigate('/pedidos')}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-enviar">Atualizar Pedido</button>
            </div>
          </form>
        </div>
  );
}

export default EditarPedidoC;








