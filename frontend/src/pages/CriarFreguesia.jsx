import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import '../styles/CriarFreguesia.css';

function CriarFreguesia() {
  const [documento, setDocumento] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setDocumento(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documento) {
      toast.error('Por favor selecione um documento.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('nomefreguesia', document.getElementById('nome').value);
    formData.append('freguesia', document.getElementById('freguesia').value);
    formData.append('cidade', document.getElementById('cidade').value);
    formData.append('rua', document.getElementById('rua').value);
    formData.append('codigo_postal', document.getElementById('codigo_postal').value);
    formData.append('estado_pedido', 'pendente');
    formData.append('dados_comprovacao', documento); // <- Ficheiro aqui

    try {
      const response = await fetch('http://localhost:3000/api/pedidosPagina/criarPedido', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
          // NÃO adicionar Content-Type aqui
        },
        body: formData
      });

      const resultado = await response.json();

      if (response.ok) {
        toast.success('Pedido enviado com sucesso!');
        navigate('/home');
      } else {
        toast.error('Erro ao enviar pedido: ' + (resultado.detalhes || resultado.error));
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      toast.error('Erro ao enviar o pedido. Tenta novamente.');
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" />
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <div className="conteudo-criar">
          <h2>Criar Freguesia</h2>
          <hr />
          <form className="formulario" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome da Freguesia</label>
            <input type="text" id="nome" placeholder="Nome da freguesia" required />

            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" placeholder="Cidade" required />

            <label htmlFor="freguesia">Freguesia</label>
            <input type="text" id="freguesia" placeholder="Freguesia" required />

            <label htmlFor="rua">Rua</label>
            <input type="text" id="rua" placeholder="Rua" required />

            <label htmlFor="codigo_postal">Código Postal</label>
            <input type="text" id="codigo_postal" placeholder="Código Postal" required />

            <label htmlFor="documentos-upload">
              Documento de Comprovação <span title="Documento obrigatório">ℹ️</span>
            </label>
            <div className="upload-box">
              <label htmlFor="documentos-upload" className="upload-label">
                <span className="plus">+</span>
                <p>Escolher Documento</p>
                <input
                  type="file"
                  id="documentos-upload"
                  name="dados_comprovacao"
                  hidden
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
              </label>

              {documento && (
                <div className="preview-documentos-inside">
                  <div className="documento-card">
                    <span className="documento-nome">{documento.name}</span>
                    <span className="documento-tamanho">{(documento.size / 1024).toFixed(1)} KB</span>
                    <button
                      type="button"
                      onClick={() => setDocumento(null)}
                      className="btn-remover"
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="btn-enviar">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CriarFreguesia;
