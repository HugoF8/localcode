import React, { useState, useEffect } from 'react';
import TicketCardList from './AprovacoesTituloTickets';
import '../../styles/AprovacoesTicketsePublicacoes.css';

function TicketsAbertos({ onUserClick }) {
  const [tickets, setTickets] = useState([]);
  const [expandidoId, setExpandidoId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const paginas = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');
    if (!token || paginas.length === 0) return;

    const fetchAbertos = async () => {
      const abertos = [];
      for (const pg of paginas) {
        try {
          const res = await fetch(
            `http://localhost:3000/api/tickets/verTicketAberto/${pg.id_pagina}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data)) abertos.push(...data);
        } catch (err) {
          console.error(err);
        }
      }
      setTickets(abertos);
    };

    fetchAbertos();
    window.addEventListener('ticketAtualizado', fetchAbertos);
    return () => window.removeEventListener('ticketAtualizado', fetchAbertos);
  }, [token]);

  const onToggleExpand = id =>
    setExpandidoId(prev => (prev === id ? null : id));

  const onInputChange = (id, val) =>
    setTickets(prev => prev.map(t => t.id_ticket === id ? { ...t, input: val } : t));

  const onSucesso = async id => {
    const t = tickets.find(x => x.id_ticket === id);
    if (!t?.input) return alert('Insira resposta antes');
    await fetch(`http://localhost:3000/api/respostasTickets/criarResposta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id_ticket: id,
        conteudo_resposta: t.input,
        estado_resposta: 'resolvido',
        id_utilizador: Number(localStorage.getItem('id_utilizador'))
      })
    });
    setTickets(prev => prev.filter(x => x.id_ticket !== id));
  };

  const onInsucesso = async id => {
    const t = tickets.find(x => x.id_ticket === id);
    if (!t?.input) return alert('Insira resposta antes');
    await fetch(`http://localhost:3000/api/respostasTickets/criarResposta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        id_ticket: id,
        conteudo_resposta: t.input,
        estado_resposta: 'nao_resolvido',
        id_utilizador: Number(localStorage.getItem('id_utilizador'))
      })
    });
    setTickets(prev => prev.filter(x => x.id_ticket !== id));
  };

  return (
    <TicketCardList
      tickets={tickets}
      expandidoId={expandidoId}
      onToggleExpand={onToggleExpand}
      onInputChange={onInputChange}
      onSucesso={onSucesso}
      onInsucesso={onInsucesso}
      onUserClick={onUserClick}
      mostrarInput
      mostrarBotoes={false}
      mostrarBotoesSucesso
      titulo="Tickets Abertos"
    />
  );
}

export default TicketsAbertos;