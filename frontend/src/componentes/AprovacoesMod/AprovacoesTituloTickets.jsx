import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import BotoesAR from '../genericos/BotoesAprovarRecusar';
import BotoesSI from '../genericos/BotoesSucessoInsucesso';

function TicketCardList({
  tickets,
  expandidoId,
  onToggleExpand,
  onInputChange,
  onAprovar,
  onRecusar,
  onSucesso,
  onInsucesso,
  onUserClick,
  mostrarInput = false,
  mostrarBotoes = true,
  mostrarBotoesSucesso = false,
  titulo = 'Lista de Tickets',
}) {
  return (
    <div className="ticket-list-wrapper">
      <h2 className="ticket-list-title">{titulo}</h2>
      <div className="ticket-list">
        {tickets.length === 0 && (
          <p className="no-tickets-message">Não há tickets</p>
        )}
        {tickets.map(ticket => (
          <div
            key={ticket.id_ticket}
            className={`ticket-card ${expandidoId === ticket.id_ticket ? 'expanded' : ''}`}
          >
            <div className="ticket-header">
              <div className="ticket-user-info">
                <img
                  src={
                    ticket.utilizador?.perfil?.[0]?.foto_perfil
                      ? `http://localhost:3000/${ticket.utilizador.perfil[0].foto_perfil}`
                      : 'http://localhost:3000/uploads/default.jpg'
                  }
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = 'http://localhost:3000/uploads/default.jpg';
                  }}
                  alt={ticket.utilizador?.nome || 'Utilizador'}
                  className="ticket-user-avatar"
                  onClick={() => onUserClick(ticket.id_utilizador)}  /* ← usa aqui ticket.id_utilizador */
                />
                <div className="ticket-user-details">
                  <span className="ticket-user-name">{ticket.utilizador?.nome}</span>
                  <span className="ticket-date-summary">
                    {new Date(ticket.data_criacao).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <span className="ticket-id">#{ticket.id_ticket}</span>
              <button
                className="ticket-toggle"
                onClick={() => onToggleExpand(ticket.id_ticket)}
              >
                {expandidoId === ticket.id_ticket ? '˄' : '˅'}
              </button>
            </div>

            {expandidoId === ticket.id_ticket && (
              <div className="ticket-body">
                <p className="ticket-description">{ticket.descricao_problema}</p>

                {mostrarInput && (
                  <input
                    type="text"
                    className="ticket-input"
                    placeholder="Escreva aqui a sua resposta..."
                    value={ticket.input || ''}
                    onChange={e => onInputChange(ticket.id_ticket, e.target.value)}
                  />
                )}

                <div className="ticket-actions">
                  {mostrarBotoes && (
                    <BotoesAR
                      onAprovar={() => onAprovar(ticket.id_ticket)}
                      onRecusar={() => onRecusar(ticket.id_ticket)}
                    />
                  )}
                  {mostrarBotoesSucesso && (
                    <BotoesSI
                      onSucesso={() => onSucesso(ticket.id_ticket)}
                      onInsucesso={() => onInsucesso(ticket.id_ticket)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketCardList;