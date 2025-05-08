import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import RespostaTicketUtilizador from './RespostaTicketUtilizador'; // Caminho ajusta conforme tua estrutura

function TicketNaoAprovadoUtilizador({ tickets, onToggleExpand, onInputChange, onAlterar, onApagar, expandidoId, token }) {
  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">Respostas a Tickets</h1>

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
              <input
                type="text"
                className="ticket-input"
                value={ticket.input || ''}
                onChange={(e) => onInputChange(ticket.id_ticket, e.target.value)}
              />
              <div className="ticket-actions">
                <button className="btn-aprovar" onClick={() => onAlterar(ticket.id_ticket)}>Alterar</button>
                <button className="btn-recusar" onClick={() => onApagar(ticket.id_ticket)}>Apagar</button>
              </div>

              {/* Aqui mostramos as respostas */}
              <RespostaTicketUtilizador idTicket={ticket.id_ticket} token={token} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TicketNaoAprovadoUtilizador;
