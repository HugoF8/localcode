import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Home.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import CriarPost from '../componentes/CriarPost';
import PostsFreguesia from '../componentes/PaginaFreguesia/PostsFreguesia';
import InfosFreguesia from '../componentes/PaginaFreguesia/InfosFreguesia';

export default function HomeFreguesia() {
  const { id } = useParams(); // id da página de freguesia

  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">

        <div className="zona-publicacoes">
          {/* informações freguesia */}
          <InfosFreguesia />

          <CriarPost />

          <PostsFreguesia />
        </div>
      </div>
    </div>
  );
}