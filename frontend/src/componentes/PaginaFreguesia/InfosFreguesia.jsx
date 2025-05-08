// src/componentes/InfosFreguesia.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BotaoSeguir from '../PaginaFreguesia/Seguir';
import '../../styles/Home.css';

function InfosFreguesia() {
  const { id } = useParams();
  const [freguesia, setFreguesia] = useState(null);
  const navigate = useNavigate();

  const irParaTicket = () => {
    navigate(`/Pagina/${id}/enviar-ticket`);
  };

  useEffect(() => {
    const fetchFreguesia = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) throw new Error('Erro ao buscar freguesia');
        const data = await response.json();
        setFreguesia(data);
      } catch (err) {
        console.error(err);
        setFreguesia(null);
      }
    };

    fetchFreguesia();
  }, [id]);

  if (!freguesia) return <div>Carregando...</div>;

  // Leitura do utilizador completo (que inclui .paginas)
  const user = JSON.parse(localStorage.getItem('utilizador') || '{}');
  // 1) Moderador? procuramos neste array se existe um objeto com role="moderador" e id_pagina === id
  const paginasDoUser = Array.isArray(user.paginas) ? user.paginas : [];
  const isMod = paginasDoUser.some(
    p => p.role === 'moderador' && p.id_pagina === Number(id)
  );
  // 2) Dono?
  const isOwner = user.id_utilizador === freguesia.id_utilizador;

  const irParaEditar = () => {
    navigate(`/Pagina/${id}/EditarPagina`);
  };

  return (
    <div className="freguesia-container">
      <div
        className="foto-capa-freguesia"
        style={{ backgroundImage: `url(http://localhost:3000/${freguesia.foto_capa})` }}
      />

      <div className="info-header">
        <div className="foto-perfil-container">
          <img
            className="foto-perfil-freguesia"
            src={`http://localhost:3000/${freguesia.foto_perfil}`}
            alt="Foto de Perfil"
          />
        </div>
        <div className="container-allInfo">
          <div className="nomeSeguirbtn-container">
            <h1 className="nome-freguesia">{freguesia.nome_pagina}</h1>
            <div className="seguir-container">
              <BotaoSeguir />
            </div>
          </div>
          <div className="btn-TicketEditar">
            <button className="botao-ticket" onClick={irParaTicket}>
              Ticket
            </button>
            {(isMod || isOwner) && (
              <button onClick={irParaEditar} className="botao-editar">
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfosFreguesia;
