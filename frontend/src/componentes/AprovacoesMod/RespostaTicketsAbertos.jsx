import { useState, useEffect } from 'react';
import TicketCardList from './AprovacoesTituloTickets';
import '../../styles/AprovacoesTicketsePublicacoes.css';

function TicketsAbertos() {
  const [tickets, setTickets] = useState([]);
  const [expandidoId, setExpandidoId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const paginasModeradas = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');
    if (!token || paginasModeradas.length === 0) return;

    const buscarTicketsAbertos = async () => {
      const todosTicketsAbertos = [];

      for (const pagina of paginasModeradas) {
        const idPagina = pagina.id_pagina;

        try {
          const res = await fetch(`http://localhost:3000/api/tickets/verTicketAberto/${idPagina}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error('Erro ao buscar tickets abertos');
          const data = await res.json();
          if (Array.isArray(data)) todosTicketsAbertos.push(...data);
        } catch (error) {
          console.error(`Erro ao buscar tickets abertos da página ${idPagina}:`, error);
        }
      }

      setTickets(todosTicketsAbertos);
    };

    buscarTicketsAbertos();
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

  const onSucesso = async (id) => {
    const ticket = tickets.find(t => t.id_ticket === id);
    if (!ticket || !ticket.input) {
      alert('Por favor, insira uma resposta antes de marcar como sucesso');
      return;
    }

    try {
      const resposta = {
        id_ticket: id,
        conteudo_resposta: ticket.input,
        estado_resposta: 'resolvido'
      };

      const res = await fetch(`http://localhost:3000/api/respostasTickets/criarResposta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resposta),
      });

      if (!res.ok) throw new Error('Erro ao criar resposta de sucesso');
      
      // Remove o ticket da lista após resposta bem-sucedida
      setTickets(prev => prev.filter(t => t.id_ticket !== id));
    } catch (error) {
      console.error('Erro ao processar ticket como sucesso:', error);
      alert('Ocorreu um erro ao processar a resposta');
    }
  };

  const onInsucesso = async (id) => {
    const ticket = tickets.find(t => t.id_ticket === id);
    if (!ticket || !ticket.input) {
      alert('Por favor, insira uma resposta antes de marcar como insucesso');
      return;
    }

    try {
      const resposta = {
        id_ticket: id,
        conteudo_resposta: ticket.input,
        estado_resposta: 'nao_resolvido'
      };

      const res = await fetch(`http://localhost:3000/api/tickets/criarResposta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resposta),
      });

      if (!res.ok) throw new Error('Erro ao criar resposta de insucesso');
      
      // Remove o ticket da lista após resposta bem-sucedida
      setTickets(prev => prev.filter(t => t.id_ticket !== id));
    } catch (error) {
      console.error('Erro ao processar ticket como insucesso:', error);
      alert('Ocorreu um erro ao processar a resposta');
    }
  };

  return (
    <div className="container">

      <div className="main-content">
   
        <div className="conteudo">
          <TicketCardList
            tickets={tickets}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
            onInputChange={onInputChange}
            onSucesso={onSucesso}
            onInsucesso={onInsucesso}
            mostrarInput={true}
            mostrarBotoes={false}
            mostrarBotoesSucesso={true}
            titulo="Tickets Abertos"
          />
        </div>
      </div>
    </div>
  );
}

export default TicketsAbertos;