import { useState, useEffect } from 'react';
import TicketCardList from '../componentes/AprovacoesMod/AprovacoesTituloTickets';
import BarraPublicacoesEticketsMod from '../componentes/BarraPublicacoesEticketsMod';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import '../styles/AprovacoesTicketsePublicacoes.css';
import TicketsAbertos from '../componentes/AprovacoesMod/RespostaTicketsAbertos'

function AprovacoesTickets() {
  const [tickets, setTickets] = useState([]);
  const [expandidoId, setExpandidoId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const paginasModeradas = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');
    if (!token || paginasModeradas.length === 0) return;

    const buscarTickets = async () => {
      const todosTickets = [];

      for (const pagina of paginasModeradas) {
        const idPagina = pagina.id_pagina;

        try {
          const res = await fetch(`http://localhost:3000/api/tickets/verTicketsPendentes/${idPagina}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error('Erro ao buscar tickets');
          const data = await res.json();
          if (Array.isArray(data)) todosTickets.push(...data);
        } catch (error) {
          console.error(`Erro ao buscar tickets da página ${idPagina}:`, error);
        }
      }

      setTickets(todosTickets);
    };

    buscarTickets();
  }, [token]);

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
          <BarraPublicacoesEticketsMod />
          <TicketCardList
            tickets={tickets}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
            onInputChange={onInputChange}
            onAprovar={onAprovar}
            onRecusar={onRecusar}
            mostrarInput={false}
            mostrarBotoes={true}
            mostrarBotoesSucesso={false}
            titulo="Aprovação de Tickets"
          />
             <TicketsAbertos />
        </div>
      </div>
    </div>
  );
}

export default AprovacoesTickets;