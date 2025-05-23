import React from 'react';
import './Botoes.css'

function BotaoAA({ onAlterar, onApagar }) {
    return (
        <div className="flex_spacearound">
        <button onClick={onAlterar}>
          <span class="shadow"></span>
          <span class="edgeA"></span>
          <span class="frontA text"> Alterar
          </span>
        </button>
        <button onClick={onApagar}>
          <span class="shadow"></span>
          <span class="edgeR"></span>
          <span class="frontR text"> Apagar
          </span>
        </button>
        </div>
        );
  }
export default BotaoAA;