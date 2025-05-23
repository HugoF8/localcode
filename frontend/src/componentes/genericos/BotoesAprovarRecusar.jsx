import React from 'react';
import './Botoes.css'

function BotoesAR({ onAprovar, onRecusar}) {
    return (
      <div className="flex_spacearound">
        <button onClick={onAprovar}>
          <span class="shadow"></span>
          <span class="edgeA"></span>
          <span class="frontA text"> Aprovar
          </span>
        </button>
        <button onClick={onRecusar}>
          <span class="shadow"></span>
          <span class="edgeR"></span>
          <span class="frontR text"> Recusar
          </span>
        </button>
      </div>
    );
  }

   export default BotoesAR;