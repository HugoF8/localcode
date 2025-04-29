import { useState, useEffect } from 'react';
import axios from 'axios';
import AprovacoesTituloTickets from '../componentes/AprovacoesTituloTickets';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import '../styles/AprovacoesTickets.css';

function AprovacoesTickets() {
    const [tickets, setTickets] = useState([]);
    const [expandidoId, setExpandidoId] = useState(null);
  
    useEffect(() => {
      // Simula dados vindos da API
      const mockTickets = [
        {
          id_ticket: 1,
          nome: 'Paulo',
          data: '06/03/2025',
          descricao_problema: 'Erro ao carregar página inicial.',
          input: '',
        },
        {
          id_ticket: 2,
          nome: 'João',
          data: '10/03/2025',
          descricao_problema: 'Texto cortado na versão mobile.',
          input: '',
        },
      ];
      setTickets(mockTickets);
    }, []);
  
    const onToggleExpand = (id) => {
      setExpandidoId((prevId) => (prevId === id ? null : id));
    };
  
    const onInputChange = (id, valor) => {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id_ticket === id ? { ...ticket, input: valor } : ticket
        )
      );
    };
  
    const onAprovar = (id) => {
      console.log(`Ticket #${id} aprovado.`);
    };
  
    const onRecusar = (id) => {
      console.log(`Ticket #${id} recusado.`);
    };
  
    return (
      <div className="container">
        <BarraSuperior />
        <div className="flex">
          <BarraLateral />
          <div className="conteudo">
            <AprovacoesTituloTickets
              tickets={tickets}
              expandidoId={expandidoId}
              onToggleExpand={onToggleExpand}
              onInputChange={onInputChange}
              onAprovar={onAprovar}
              onRecusar={onRecusar}
            />
          </div>
        </div>
      </div>
    );
  }
    
    export default AprovacoesTickets;