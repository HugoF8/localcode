import React from 'react';
import './Botoes.css'

function BotoesSI({ onInsucesso, onSucesso}) {
    return (
      <div className="ticket-actions">
        <button onClick={onSucesso}>
          <span class="shadow"></span>
          <span class="edgeA"></span>
          <span class="frontA text"> Sucesso
          </span>
        </button>
        <button onClick={onInsucesso}>
          <span class="shadow"></span>
          <span class="edgeR"></span>
          <span class="frontR text"> Insucesso
          </span>
        </button>
      </div>
    );
  }

   export default BotoesSI;