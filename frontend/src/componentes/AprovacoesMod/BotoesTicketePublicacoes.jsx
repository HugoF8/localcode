import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';

function BotoesTicketePublicacoesPedidos({ onAprovar, onRecusar}) {
    return (
      <div className="flex_spacearound">
        <button className="btn-aprovar" onClick={onAprovar}>
          Aprovar
        </button>
        <button className="btn-recusar" onClick={onRecusar}>
          Recusar
        </button>
      </div>
    );
  }

  export default BotoesTicketePublicacoesPedidos;