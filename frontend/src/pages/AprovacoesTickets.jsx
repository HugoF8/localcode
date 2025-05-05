import { useState, useEffect } from 'react';
import AprovacoesTituloTickets from '../componentes/AprovacoesTituloTickets';
import BarraPublicacoesEticketsMod from '../componentes/BarraPublicacoesEticketsMod';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import '../styles/AprovacoesTicketsePublicacoes.css';

function AprovacoesTickets() {
    const [tickets, setTickets] = useState([]);
    const [expandidoId, setExpandidoId] = useState(null);

    const token = localStorage.getItem('token'); // JWT token do utilizador
    const idPagina = 1; // Substitui isto pelo ID real da página
  
    useEffect(() => {
      fetch(`http://localhost:3000/api/tickets/verTicketsPendentes/${idPagina}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Erro ao buscar tickets');
          return res.json();
        })
        .then((data) => {
          setTickets(data);
        })
        .catch((error) => {
          console.error(error);
        });
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
      fetch(`http://localhost:3000/api/tickets/atualizarEstadoTicket/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bol: true }),
      }).then(() => {
        setTickets((prev) => prev.filter((t) => t.id_ticket !== id));
      });
    };
  
    const onRecusar = (id) => {
      fetch(`http://localhost:3000/api/tickets/atualizarEstadoTicket/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bol: false }),
      }).then(() => {
        setTickets((prev) => prev.filter((t) => t.id_ticket !== id));
      });
    };
  
    return (
      <div className="container">
        <BarraSuperior />
        <div className="flex">
          <BarraLateral />
          <div className="conteudo">
          <BarraPublicacoesEticketsMod/>
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