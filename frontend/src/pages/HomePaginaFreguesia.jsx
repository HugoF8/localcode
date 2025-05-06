import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Home.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import BotaoSeguir from '../componentes/PaginaFreguesia/Seguir';
import CriarPost from '../componentes/CriarPost';
import PostsFreguesia from '../componentes/PaginaFreguesia/PostsFreguesia';

export default function HomeFreguesia() {
  const navigate = useNavigate();
  const { id } = useParams(); // id da página de freguesia

  const irParaTicket = () => {
    navigate(`/Pagina/${id}/enviar-ticket`);
  };

  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />

        <div className="zona-publicacoes">
          {/* Botão de seguir à página */}
          <BotaoSeguir />

          <button
            onClick={irParaTicket}

            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#4a4a4a',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Ticket
          </button>
          
          {/* Formulário de criação de post — SEMPRE visível */}
          <CriarPost />

          {/* Lista de posts */}
          <PostsFreguesia />

          {/* Botão para ir à página de envio de ticket */}
          
        </div>
      </div>
    </div>
  );
}
