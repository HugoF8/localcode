import React, { useState } from 'react';
import BotoesTicket from '../componentes/BotoesTicket';
import '../styles/AprovacoesTicketsePublicacoes.css';

function AprovacoesTituloTickets({ tickets, onToggleExpand, onInputChange, onAprovar, onRecusar, expandidoId }) {
  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">Aprovação de Tickets</h1>

      {tickets.map((ticket) => (
        <div
          key={ticket.id_ticket}
          className={`ticket-card ${expandidoId === ticket.id_ticket ? 'expanded' : ''}`}
        >
          <div className="ticket-header">
            <div className="ticket-user-info">
              <img
                src={`http://localhost:3000/uploads/${ticket.utilizador?.perfil?.foto_perfil || 'default.jpg'}`}
                alt={ticket.utilizador?.nome || 'Utilizador'} 
                className="ticket-user-img"
              />
              <p className="ticket-user">{ticket.utilizador?.nome || 'Utilizador'}</p>
            </div>
            <div className="ticket-id">#{ticket.id_ticket}</div>
            <button className="ticket-toggle" onClick={() => onToggleExpand(ticket.id_ticket)}>
              {expandidoId === ticket.id_ticket ? '˄' : '˅'}
            </button>
          </div>

          {expandidoId === ticket.id_ticket && (
            <>
              <p className="ticket-date">
                {new Date(ticket.data_criacao).toLocaleDateString()}
              </p>
              <p className="ticket-description">{ticket.descricao_problema}</p>
              <input
                type="text"
                className="ticket-input"
                value={ticket.input || ''}
                onChange={(e) => onInputChange(ticket.id_ticket, e.target.value)}
              />
              <BotoesTicket
                onAprovar={() => onAprovar(ticket.id_ticket)}
                onRecusar={() => onRecusar(ticket.id_ticket)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AprovacoesTituloTickets;