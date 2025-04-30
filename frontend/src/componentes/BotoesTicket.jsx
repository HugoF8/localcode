import React from 'react';
import '../styles/AprovacoesTickets.css';

function BotoesTicket({ onAprovar, onRecusar }) {
    return (
      <div className="ticket-actions">
        <button className="btn-aprovar" onClick={onAprovar}>
          Aprovar
        </button>
        <button className="btn-recusar" onClick={onRecusar}>
          Recusar
        </button>
      </div>
    );
  }

export default BotoesTicket;