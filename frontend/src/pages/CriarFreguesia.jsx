import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import '../styles/CriarFreguesia.css';

function CriarFreguesia() {
  const [documentos, setDocumentos] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const novosFicheiros = Array.from(e.target.files);
    setDocumentos((prev) => [...prev, ...novosFicheiros]);
  };

  const removerDocumento = (index) => {
    setDocumentos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosPedido = {
      nomefreguesia: document.getElementById('nome').value,
      freguesia: document.getElementById('freguesia').value,
      cidade: document.getElementById('cidade').value,    
      rua: document.getElementById('rua').value, 
      codigo_postal: parseInt(document.getElementById('codigo_postal').value),
      dados_comprovacao: document.getElementById('documentos-upload').value,
      id_utilizador: parseInt(localStorage.getItem('id_utilizador')), 
      id_morada: parseInt(localStorage.getItem('id_morada')),        
      estado_pedido: 'pendente'
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/api/pedidosPagina/criarPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(dadosPedido)
      });

      const resultado = await response.json();

      if (response.ok) {
        toast.success('Pedido de freguesia enviado com sucesso!');
        navigate('/home');
      } else {
        toast.error('Erro ao enviar pedido: ' + (resultado.detalhes || resultado.error));
        console.error('Erro ao enviar pedido: ' + (resultado.detalhes || resultado.error))
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
            
            <label htmlFor="Cidade">Cidade</label>
            <input type="text" id="cidade" placeholder="Cidade" required />

            <label htmlFor="Freguesia">Freguesia</label>
            <input type="text" id="freguesia" placeholder="Freguesia" required />

            <label htmlFor="Rua">Rua</label>
            <input type="text" id="rua" placeholder="Rua" required/>
            
            <label htmlFor="Codigo Postal">Codigo Postal</label>
            <input type="text" id="codigo_postal" placeholder="Codigo Postal" required/>


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
                        <span className="documento-tamanho">{(file.size / 1024).toFixed(1)} KB</span>
                        <button type="button" onClick={() => removerDocumento(index)} className="btn-remover">✖️</button>
                      </div>
                    </div>
                  ))}
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
