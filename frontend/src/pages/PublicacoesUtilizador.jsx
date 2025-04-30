import { useState, useEffect } from 'react';
import axios from 'axios';
import BarraPublicacoesEtickets from '../componentes/BarraPublicacoesEtickets';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';

import '../styles/PublicacoesEtickets.css';

function PublicacoesUtilizador() {
    const [tickets, setTickets] = useState([]);
    const [expandidoId, setExpandidoId] = useState(null);

    return (
      <div className="container">
        <BarraSuperior />
        <div className="flex">
          <BarraLateral />
          <div className="conteudo">
            <BarraPublicacoesEtickets/>   
          </div>
        </div>
      </div>
    );
  }
export default PublicacoesUtilizador;
