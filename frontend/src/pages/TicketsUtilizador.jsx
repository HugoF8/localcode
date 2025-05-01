import { useState, useEffect } from 'react';
import axios from 'axios';
import BarraPublicacoesEtickets from '../componentes/BarraPublicacoesEtickets';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import TicketNaoAprovadoUtilizador from '../componentes/TicketAprovUtilizador/TicketNaoAprovadoUtilizador';
import TicketAprovadoUtilizador from '../componentes/TicketAprovUtilizador/TicketAprovadoUtilizador';

import '../styles/PublicacoesEtickets.css';

function TicketsUtilizador() {
  const [tickets, setTickets] = useState({ abertos: [], fechados: [] });
  const [expandidoId, setExpandidoId] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [abertos, fechados] = await Promise.all([
          axios.get('/api/tickets/verTicketAberto', config),
          axios.get('/api/tickets/verTicketFechado', config),
        ]);

        const fechadosComInput = fechados.data.map(t => ({
          ...t,
          input: '',
        }));

        setTickets({
          abertos: abertos.data,
          fechados: fechadosComInput,
        });
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const onToggleExpand = (id) => {
    setExpandidoId((prevId) => (prevId === id ? null : id));
  };

  const onInputChange = (id, valor) => {
    setTickets((prev) => ({
      ...prev,
      fechados: prev.fechados.map((ticket) =>
        ticket.id_ticket === id ? { ...ticket, input: valor } : ticket
      ),
    }));
  };

  const onAlterar = async (id) => {
    const ticket = tickets.fechados.find(t => t.id_ticket === id);
    if (!ticket) return;

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.patch(`/api/tickets/alterarTicket/${id}`, {
        descricao_problema: ticket.input,
      }, config);

      alert('Descrição do ticket alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar ticket:', error);
    }
  };

  const onApagar = async (id) => {
    if (!window.confirm('Tens a certeza que queres apagar este ticket?')) return;
  
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
  
      // Nota: atualmente não tens rota DELETE implementada no backend.
      await axios.delete(`/api/tickets/${id}`, config); // Supondo que crias esta rota no backend
  
      // Remove do estado
      setTickets((prev) => ({
        ...prev,
        fechados: prev.fechados.filter(ticket => ticket.id_ticket !== id),
      }));
  
      alert('Ticket apagado com sucesso!');
    } catch (error) {
      console.error('Erro ao apagar ticket:', error);
    }
  };
  

  return (
    <div className="container">
      <BarraSuperior />
      <div className="flex">
        <BarraLateral />
        <div className="conteudo">
          <BarraPublicacoesEtickets />
          <TicketNaoAprovadoUtilizador
            tickets={tickets.fechados}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
            onInputChange={onInputChange}
            onAlterar={onAlterar}
            onApagar={onApagar}
          />
          <TicketAprovadoUtilizador
            tickets={tickets.abertos}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketsUtilizador;