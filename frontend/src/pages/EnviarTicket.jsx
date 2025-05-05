// src/pages/EnviarTicket.jsx
import React from 'react';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import TicketSubmission from '../componentes/CriarTicket';
import '../styles/EnviarTicket.css';

export default function EnviarTicket() {
  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <div className="conteudo-criar">
          <h2>Enviar Ticket</h2>
          <hr />
          <TicketSubmission />
        </div>
      </div>
    </div>
  );
}
