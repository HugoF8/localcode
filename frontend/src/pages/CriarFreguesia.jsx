import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
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
      localizacao: document.getElementById('localizacao').value,
      descricao: document.getElementById('descricao').value,
      id_utilizador: parseInt(localStorage.getItem('id_utilizador')), 
      id_morada: parseInt(localStorage.getItem('id_morada')),        
      estado_pedido: 'pendente'
    };

    try {
      const response = await fetch('http://localhost:3000/pedidos/criarPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPedido)
      });

      const resultado = await response.json();

      if (response.ok) {
        alert('Pedido de freguesia enviado com sucesso!');
        navigate('/dashboard');
      } else {
        alert('Erro ao enviar pedido: ' + (resultado.detalhes || resultado.error));
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar o pedido. Tenta novamente.');
    }
  };

  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <div className="conteudo-criar">
          <h2>Criar Freguesia</h2>
          <hr />
          <form className="formulario" onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome da Freguesia</label>
            <input type="text" id="nome" placeholder="Nome da freguesia" required />

            <label htmlFor="localizacao">Localização</label>
            <input type="text" id="localizacao" placeholder="Localização" required />

            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" placeholder="Descrição" rows="5" required></textarea>

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
