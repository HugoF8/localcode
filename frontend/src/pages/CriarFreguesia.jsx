import { useState } from 'react';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import '../styles/CriarFreguesia.css';

function CriarFreguesia() {
  const [documentos, setDocumentos] = useState([]);

  const handleFileChange = (e) => {
    const novosFicheiros = Array.from(e.target.files);
    setDocumentos((prev) => [...prev, ...novosFicheiros]);
  };

  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <div className="conteudo-criar">
          <h2>Criar Freguesia</h2>
          <hr />
          <form className="formulario">
            <label htmlFor="nome">Nome da Freguesia</label>
            <input type="text" id="nome" placeholder="Nome da freguesia" />

            <label htmlFor="localizacao">Localização</label>
            <input type="text" id="localizacao" placeholder="Localização" />

            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" placeholder="Descrição" rows="5"></textarea>

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