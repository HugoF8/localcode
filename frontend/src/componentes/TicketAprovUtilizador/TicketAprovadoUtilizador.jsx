import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';

function TicketAprovadoUtilizador({ tickets, onToggleExpand, expandidoId }) {
  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">Aprovados</h1>

      {tickets.map((ticket) => (
        <div
          key={ticket.id_ticket}
          className={`ticket-card ${expandidoId === ticket.id_ticket ? 'expanded' : ''}`}
        >
          <div className="ticket-header">
            <div>
              <p className="ticket-user">{ticket.utilizador?.nome || 'Utilizador'}</p>
              <p className="ticket-date">
                {new Date(ticket.data_criacao).toLocaleDateString('pt-PT')}
              </p>
            </div>
            <div className="ticket-id">#{ticket.id_ticket}</div>
            <button className="ticket-toggle" onClick={() => onToggleExpand(ticket.id_ticket)}>
              {expandidoId === ticket.id_ticket ? '˄' : '˅'}
            </button>
          </div>

          {expandidoId === ticket.id_ticket && (
            <>
              <p className="ticket-description">{ticket.descricao_problema}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TicketAprovadoUtilizador;
