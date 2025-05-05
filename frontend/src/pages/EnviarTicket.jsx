// src/pages/EnviarTicket.jsx
import React from 'react';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
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
