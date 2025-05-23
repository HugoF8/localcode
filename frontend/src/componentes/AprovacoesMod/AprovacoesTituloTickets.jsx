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
  mostrarInput = false,
  mostrarBotoes = true,
  mostrarBotoesSucesso = false,
  titulo = "Lista de Tickets",
}) {
  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">{titulo}</h1>

      {tickets.map((ticket) => (
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'http://localhost:3000/uploads/default.jpg';
                }}
                alt={ticket.utilizador?.nome || 'Utilizador'}
                className="ticket-user-img"
              />
              <p className="ticket-user">{ticket.utilizador?.nome || 'Utilizador'}</p>
            </div>

            <div className="ticket-id">#{ticket.id_ticket}</div>

            <button
              className="ticket-toggle"
              onClick={() => onToggleExpand(ticket.id_ticket)}
            >
              {expandidoId === ticket.id_ticket ? '˄' : '˅'}
            </button>
          </div>

          {expandidoId === ticket.id_ticket && (
            <>
              <p className="ticket-date">
                {new Date(ticket.data_criacao).toLocaleDateString()}
              </p>
              <p className="ticket-description">{ticket.descricao_problema}</p>

              {mostrarInput && (
                <input
                  type="text"
                  className="ticket-input"
                  value={ticket.input || ''}
                  onChange={(e) => onInputChange(ticket.id_ticket, e.target.value)}
                />
              )}

              {mostrarBotoes && (
                <div className="ticket-actions">
                  <BotoesAR
                    onAprovar={() => onAprovar(ticket.id_ticket)}
                    onRecusar={() => onRecusar(ticket.id_ticket)}
                  />
                </div>
              )}

              {mostrarBotoesSucesso && (
                <BotoesSI
                    onSucesso={() => onSucesso(ticket.id_ticket)}
                    onInsucesso={() => onInsucesso(ticket.id_ticket)}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TicketCardList;
