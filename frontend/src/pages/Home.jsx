// src/pages/Home.jsx
import React from 'react';
import '../styles/Home.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral'; // usa agora a versão dinâmica
import ZonaPublicacoesHome from '../componentes/publicacoes/ZonaPublicacoesHome';

export default function Home() {
  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
        <ZonaPublicacoesHome />
      </div>
    </div>
  );
}
