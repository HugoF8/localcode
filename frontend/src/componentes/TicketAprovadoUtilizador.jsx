import React, { useState } from 'react';
import '../styles/AprovacoesTickets.css';

function AprovacoesTituloTickets({ tickets, onToggleExpand, onInputChange, onAlterar, expandidoId }) {
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
              <p className="ticket-user">{ticket.nome}</p>
              <p className="ticket-date">{ticket.data}</p>
            </div>
            <div className="ticket-id">#{ticket.id_ticket}</div>
            <button className="ticket-toggle" onClick={() => onToggleExpand(ticket.id_ticket)}>
              {expandidoId === ticket.id_ticket ? '˄' : '˅'}
            </button>
          </div>

          {expandidoId === ticket.id_ticket && (
            <>
              <p className="ticket-description">{ticket.descricao_problema}</p>
              <input
                type="text"
                className="ticket-input"
                value={ticket.input || ''}
                onChange={(e) => onInputChange(ticket.id_ticket, e.target.value)}
              />
              <div className="ticket-actions">
                <button className="btn-aprovar" onClick={() => onAlterar(ticket.id_ticket)}>Alterar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}


export default AprovacoesTituloTickets;