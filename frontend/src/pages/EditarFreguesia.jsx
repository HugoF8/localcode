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

  useEffect(() => {
    const fetchFreguesia = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Erro ao buscar freguesia');
        const data = await response.json();
        setNomePagina(data.nome_pagina);
        setPreviewPerfil(data.foto_perfil ? `http://localhost:3000/${data.foto_perfil}` : null);
        setPreviewCapa(data.foto_capa ? `http://localhost:3000/${data.foto_capa}` : null);        
      } catch (err) {
        console.error(err);
      }
    };

    fetchFreguesia();
  }, [id]);

  useEffect(() => {
    if (fotoPerfil) {
      const url = URL.createObjectURL(fotoPerfil);
      setPreviewPerfil(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [fotoPerfil]);

  useEffect(() => {
    if (fotoCapa) {
      const url = URL.createObjectURL(fotoCapa);
      setPreviewCapa(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [fotoCapa]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome_pagina', nomePagina);
    if (fotoPerfil) formData.append('foto_perfil', fotoPerfil);
    if (fotoCapa) formData.append('foto_capa', fotoCapa);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/paginaFreguesias/editarPaginaFreguesia/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Erro ao atualizar freguesia');

      navigate(`/Pagina/${id}`);
    } catch (err) {
      console.error(err);
      toast.error('Falha ao atualizar a página.');
    }
  };

  return (
    <div className="editar-freguesia-container" style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <ToastContainer position="top-right" />
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Editar Página da Freguesia</h2>

      <form onSubmit={handleSubmit} className="form-editar-freguesia" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <label>
          Nome da Página:
          <input
            type="text"
            value={nomePagina}
            onChange={(e) => setNomePagina(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
          />
        </label>

        <label>
          Foto de Perfil:
          <input type="file" accept="image/*" onChange={(e) => setFotoPerfil(e.target.files[0])} />
          {previewPerfil && (
            <img src={previewPerfil} alt="Preview Perfil" style={{ width: '100px', marginTop: '0.5rem', borderRadius: '8px' }} />
          )}
        </label>

        <label>
          Foto de Capa:
          <input type="file" accept="image/*" onChange={(e) => setFotoCapa(e.target.files[0])} />
          {previewCapa && (
            <img src={previewCapa} alt="Preview Capa" style={{ width: '100%', marginTop: '0.5rem', borderRadius: '8px' }} />
          )}
        </label>

        <button
          type="submit"
          className="botao-salvar"
          style={{
            backgroundColor: '#4a4a4a',
            color: 'white',
            padding: '0.8rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default EditarFreguesia;
