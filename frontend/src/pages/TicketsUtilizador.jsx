import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarraPublicacoesEtickets from '../componentes/BarraPublicacoesEtickets';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import TicketNaoAprovadoUtilizador from '../componentes/TicketAprovUtilizador/TicketNaoAprovadoUtilizador';
import TicketAprovadoUtilizador from '../componentes/TicketAprovUtilizador/TicketAprovadoUtilizador';

import '../styles/PublicacoesEtickets.css';

function TicketsUtilizador() {
  const [tickets, setTickets] = useState({ abertos: [], fechados: [] });
  const [expandidoId, setExpandidoId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const config = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const resAbertos = await fetch('http://localhost:3000/api/tickets/verTicketAberto', config);
        const resFechados = await fetch('http://localhost:3000/api/tickets/verTicketFechado', config);

        if (!resAbertos.ok || !resFechados.ok) throw new Error('Erro ao buscar tickets');

        const dataAbertos = await resAbertos.json();
        const dataFechados = await resFechados.json();

        const fechadosComInput = dataFechados.map(t => ({
          ...t,
          input: '',
        }));

        setTickets({
          abertos: dataAbertos,
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
      await fetch(`http://localhost:3000/api/tickets/alterarTicket/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descricao_problema: ticket.input,
        }),
      });

      toast.success('Descrição do ticket alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar ticket:', error);
      toast.error('Erro ao alterar o ticket.');
    }
  };

  const onApagar = async (id) => {
    if (!window.confirm('Tens a certeza que queres apagar este ticket?')) return;

    try {
      await fetch(`http://localhost:3000/api/tickets/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTickets((prev) => ({
        ...prev,
        fechados: prev.fechados.filter(ticket => ticket.id_ticket !== id),
      }));

      toast.success('Ticket apagado com sucesso!');
    } catch (error) {
      console.error('Erro ao apagar ticket:', error);
      toast.error('Erro ao apagar o ticket.');
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" />
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
            token={token} // ← aqui
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