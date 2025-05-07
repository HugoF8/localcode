import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function EditarFreguesia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nomePagina, setNomePagina] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [fotoCapa, setFotoCapa] = useState('');

  useEffect(() => {
    const fetchFreguesia = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar freguesia');
        const data = await response.json();
        setNomePagina(data.nome_pagina);
        setFotoPerfil(data.foto_perfil);
        setFotoCapa(data.foto_capa);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFreguesia();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/paginaFreguesia/editarPaginaFreguesia/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome_pagina: nomePagina,
          foto_perfil: fotoPerfil,
          foto_capa: fotoCapa
        })
      });

      if (!response.ok) throw new Error('Erro ao atualizar freguesia');

      navigate(`/Pagina/${id}`);
    } catch (err) {
      console.error(err);
      alert('Falha ao atualizar a página.');
    }
  };

  return (
    <div className="editar-freguesia-container">
      <h2>Editar Página da Freguesia</h2>
      <form onSubmit={handleSubmit} className="form-editar-freguesia">
        <label>
          Nome da Página:
          <input value={nomePagina} onChange={(e) => setNomePagina(e.target.value)} />
        </label>
        <label>
          URL da Foto de Perfil:
          <input value={fotoPerfil} onChange={(e) => setFotoPerfil(e.target.value)} />
        </label>
        <label>
          URL da Foto de Capa:
          <input value={fotoCapa} onChange={(e) => setFotoCapa(e.target.value)} />
        </label>

        <button type="submit" className="botao-salvar">Salvar</button>
      </form>
    </div>
  );
}

export default EditarFreguesia;
