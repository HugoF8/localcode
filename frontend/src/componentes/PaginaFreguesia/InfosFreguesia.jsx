import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Home.css';

function InfosFreguesia() {
  const { id } = useParams();
  const [freguesia, setFreguesia] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFreguesia = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Erro ao buscar freguesia');
        const data = await response.json();
        console.log(data); // Verifica o que a API está a retornar
        setFreguesia(data);
      } catch (err) {
        console.error(err);
        setFreguesia(null);
      }
    };
  
    fetchFreguesia();
  }, [id]);
  

  if (!freguesia) return <div>Carregando...</div>;

  const irParaEditar = () => {
    navigate(`/Pagina/${id}/EditarPagina`);
  };

  return (
    <div className="freguesia-container">
    <div
      className="foto-capa-freguesia"
      style={{ backgroundImage: `url(http://localhost:3000/${freguesia.foto_capa})` }}
    />
    <div className="foto-perfil-container">
      <img className="foto-perfil-freguesia" src={`http://localhost:3000/${freguesia.foto_perfil}`} alt="Foto de Perfil" />
    </div>
      <h1 className="nome-freguesia">{freguesia.nome_pagina}</h1>

      <button onClick={irParaEditar} className="botao-editar">
        Editar
      </button>
    </div>
  );
}

export default InfosFreguesia;
