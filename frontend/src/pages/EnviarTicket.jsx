import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import '../styles/CriarFreguesia.css';

function EnviarTicket() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <div className="conteudo-criar">
          <h2>Descrição de Problemers</h2>
          <hr />

            <label htmlFor="localizacao">Localização</label>
            <input type="text" id="localizacao" placeholder="Localização" required />

            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" placeholder="Descrição" rows="5" required></textarea>

            <button type="submit" className="btn-enviar">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default EnviarTicket;
