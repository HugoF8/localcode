import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import FiltrarPorData from '../FiltrarPorData';

function TicketAprovadoUtilizador({ tickets, expandidoId, onToggleExpand }) {
  return (
    <FiltrarPorData
      dados={tickets}
      campoData="data_ticket"
      titulo="Tickets Abertos"
      renderItem={(ticket) => (
        <div
          key={ticket.id_ticket}
          className={`ticket-card ${expandidoId === ticket.id_ticket ? 'expanded' : ''}`}
        >
          <div className="ticket-header">
            <div>
              <p className="ticket-user">{ticket.utilizador?.nome || 'Utilizador'}</p>
              <p className="ticket-date">
                {ticket.data_ticket
                  ? new Date(ticket.data_ticket).toLocaleDateString('pt-PT')
                  : ticket.data_criacao
                    ? new Date(ticket.data_criacao).toLocaleDateString('pt-PT')
                    : 'Data indisponível'}
              </p>
            </div>
            <div className="ticket-id">#{ticket.id_ticket}</div>
            <button className="ticket-toggle" onClick={() => onToggleExpand(ticket.id_ticket)}>
              {expandidoId === ticket.id_ticket ? '˄' : '˅'}
            </button>
          </div>

          {expandidoId === ticket.id_ticket && (
            <p className="ticket-description">{ticket.descricao_problema}</p>
          )}
        </div>
      )}
    />
  );
}

export default TicketAprovadoUtilizador;
