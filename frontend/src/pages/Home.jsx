// src/pages/Home.jsx
import React from 'react';
import '../styles/Home.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral'; // usa agora a versão dinâmica
import ZonaPublicacoesHome from '../componentes/publicacoes/ZonaPublicacoesHome';
import PaginasSeguidas from '../utilities/PaginasSeguidas/ProcurarPaginasSeguidas'
import PaginasModeradas from '../utilities/PaginasModerador/PaginasModerador'

export default function Home() {
  PaginasModeradas();
  PaginasSeguidas();
  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <div className='zona-publicacoes'>
          <BarraLateral />
          <ZonaPublicacoesHome />
        </div>
      </div>
    </div>
  );
}
