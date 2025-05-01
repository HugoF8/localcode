import React from 'react';
import '../styles/AprovacoesTicketsePublicacoes.css';

function BotoesTicketePublicacoes({ onAprovar, onRecusar}) {
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

  export default BotoesTicketePublicacoes;