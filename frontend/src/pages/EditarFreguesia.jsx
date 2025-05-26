import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Home.css';

function EditarFreguesia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nomePagina, setNomePagina] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoCapa, setFotoCapa] = useState(null);
  const [previewPerfil, setPreviewPerfil] = useState(null);
  const [previewCapa, setPreviewCapa] = useState(null);

  // 1) Buscar dados iniciais
  useEffect(() => {
    async function fetchFreguesia() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setNomePagina(data.nome_pagina);
        setPreviewPerfil(data.foto_perfil ? `http://localhost:3000/${data.foto_perfil}` : null);
        setPreviewCapa(data.foto_capa ? `http://localhost:3000/${data.foto_capa}` : null);
      } catch (err) {
        console.error('Erro ao buscar:', err);
      }
    }
    fetchFreguesia();
  }, [id]);

  // 2) Gerar preview ao selecionar perfil
  useEffect(() => {
    if (!fotoPerfil) return;
    const url = URL.createObjectURL(fotoPerfil);
    setPreviewPerfil(url);
    return () => URL.revokeObjectURL(url);
  }, [fotoPerfil]);

  // 3) Gerar preview ao selecionar capa
  useEffect(() => {
    if (!fotoCapa) return;
    const url = URL.createObjectURL(fotoCapa);
    setPreviewCapa(url);
    return () => URL.revokeObjectURL(url);
  }, [fotoCapa]);

  // 4) Enviar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome_pagina', nomePagina);
    if (fotoPerfil) formData.append('foto_perfil', fotoPerfil);
    if (fotoCapa) formData.append('foto_capa', fotoCapa);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:3000/api/paginaFreguesias/editarPaginaFreguesia/${id}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        }
      );
      if (!res.ok) throw new Error();
      navigate(`/Pagina/${id}`);
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      toast.error('Falha ao atualizar a página.');
    }
  };

  return (
    <div className="editar-wrapper">
      <ToastContainer position="top-right" />
      <div className="card-editar-freguesia">
        <h2 className="titulo-editar">Editar Página da Freguesia</h2>

        <form onSubmit={handleSubmit} className="form-editar">
          {/* Nome da Página */}
          <div className="input-group">
            <label htmlFor="nome" className="label-text">Nome da Página</label>
            <input
              id="nome"
              type="text"
              value={nomePagina}
              onChange={(e) => setNomePagina(e.target.value)}
              className="input-campo"
              placeholder="Escreva o nome..."
            />
          </div>

          {/* Upload Perfil */}
          <div className="upload-group">
            <span className="label-text">Foto de Perfil</span>
            <div className="upload-control">
              <label htmlFor="perfil" className="btn-upload">Escolher Foto de Perfil</label>
              <input
                type="file"
                id="perfil"
                accept="image/*"
                onChange={(e) => setFotoPerfil(e.target.files[0])}
                className="input-file-hidden"
              />
              <span className="file-name">
                {fotoPerfil ? fotoPerfil.name : 'Nenhum ficheiro'}
              </span>
            </div>
            {previewPerfil && (
              <img src={previewPerfil} alt="Preview Perfil" className="preview-imagem perfil" />
            )}
          </div>

          {/* Upload Capa */}
          <div className="upload-group">
            <span className="label-text">Foto de Capa</span>
            <div className="upload-control">
              <label htmlFor="capa" className="btn-upload">Escolher Foto de Capa</label>
              <input
                type="file"
                id="capa"
                accept="image/*"
                onChange={(e) => setFotoCapa(e.target.files[0])}
                className="input-file-hidden"
              />
              <span className="file-name">
                {fotoCapa ? fotoCapa.name : 'Nenhum ficheiro'}
              </span>
            </div>
            {previewCapa && (
              <img src={previewCapa} alt="Preview Capa" className="preview-imagem capa" />
            )}
          </div>

          <button type="submit" className="botao-submit">
            Guardar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarFreguesia;
