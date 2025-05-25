import React, { useState, useEffect } from 'react';
import TicketCardList from '../componentes/AprovacoesMod/AprovacoesTituloTickets';
import BarraPublicacoesEticketsMod from '../componentes/BarraPublicacoesEticketsMod';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import TicketsAbertos from '../componentes/AprovacoesMod/RespostaTicketsAbertos';
import UserProfilePopup from '../componentes/PerfilUtilizadorClick';
import '../styles/AprovacoesTicketsePublicacoes.css';

function AprovacoesTickets() {
  const [tickets, setTickets] = useState([]);
  const [expandidoId, setExpandidoId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const paginas = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');
    if (!token || paginas.length === 0) return;
    (async () => {
      const all = [];
      for (const pg of paginas) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/tickets/verTicketsPendentes/${pg.id_pagina}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data)) all.push(...data);
        } catch (err) {
          console.error(err);
        }
      }
      setTickets(all);
    })();
  }, [token]);

  const handleUserClick = userId => {
    if (userId) setSelectedUserId(userId);
  };
  const handleClosePopup = () => setSelectedUserId(null);

  const onToggleExpand = id =>
    setExpandidoId(prev => (prev === id ? null : id));
  const onInputChange = (id, val) =>
    setTickets(prev => prev.map(t => t.id_ticket === id ? { ...t, input: val } : t));
  const onAprovar = id =>
    fetch(`http://localhost:3000/api/tickets/atualizarEstadoTicket/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ bol: true })
    }).then(() => {
      setTickets(prev => prev.filter(t => t.id_ticket !== id));
      window.dispatchEvent(new Event('ticketAtualizado'));
    });
  const onRecusar = id =>
    fetch(`http://localhost:3000/api/tickets/atualizarEstadoTicket/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ bol: false })
    }).then(() => setTickets(prev => prev.filter(t => t.id_ticket !== id)));

  return (
    <div className="container">
      <BarraSuperior />
      <div className="flex">
        <BarraLateral />
        <div className="conteudo">
          <BarraPublicacoesEticketsMod />

          <div className="tickets-sections">
            <div className="ticket-section">
              <TicketCardList
                tickets={tickets}
                expandidoId={expandidoId}
                onToggleExpand={onToggleExpand}
                onInputChange={onInputChange}
                onAprovar={onAprovar}
                onRecusar={onRecusar}
                onUserClick={handleUserClick}
                mostrarInput={false}
                mostrarBotoes
                mostrarBotoesSucesso={false}
                titulo="Respostas a Tickets"
              />
            </div>
            <div className="ticket-section">
              <TicketsAbertos onUserClick={handleUserClick} />
            </div>
          </div>

          {selectedUserId && (
            <UserProfilePopup
              userId={selectedUserId}
              onClose={handleClosePopup}
              token={token}
              paginaAtualId={null}
              currentUserId={Number(localStorage.getItem('id_utilizador'))}
              idDonoPagina={null}
              isModeradorNaPagina={false}
              isPageOwner={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AprovacoesTickets;