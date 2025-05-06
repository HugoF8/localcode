// src/componentes/NotificacoesDropDown.jsx
import React, { useState } from 'react';
import notificationIcon from '../../assets/notification-icon.png';

export default function NotificacoesDropDown() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = async () => {
    const token = localStorage.getItem('token');
    const id_utilizador = Number(localStorage.getItem('id_utilizador'));
    if (!token || !id_utilizador) return;

    if (!isOpen) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/notificacao/verNotificacaoPorUtilizador/${id_utilizador}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error('Erro ao buscar notificações');
        const data = await res.json();

        const ultimasCinco = data
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 5);

        setNotificacoes(ultimasCinco);
      } catch (err) {
        console.error('Erro ao buscar notificações:', err);
      }
    }

    setIsOpen((open) => !open);
  };

  const renderMensagem = (notif) => {
    const { tipo_notificacao, id_ticket, id_post, id_pagina } = notif;

    // Pedido de página de freguesia
    if (id_pagina && !id_post && !id_ticket) {
      switch (tipo_notificacao) {
        case 'Aprovado':
          return 'O seu pedido de página de freguesia foi aprovado.';
        case 'Recusado':
          return 'O seu pedido de página de freguesia foi recusado.';
        case 'Verificacao':
          return 'O seu pedido de página de freguesia está em verificação.';
        case 'Validacao':
          return 'Novo pedido de página de freguesia para validação.';
        default:
          return 'Tem uma nova notificação de pedido de página.';
      }
    }

    // Post
    if (id_post) {
      switch (tipo_notificacao) {
        case 'Aprovado':
          return 'O seu post foi aprovado.';
        case 'Recusado':
          return 'O seu post foi recusado.';
        case 'Verificacao':
          return 'O seu post está em verificação.';
        case 'Validacao':
          return 'Novo post para validação pela moderação.';
        default:
          return 'Tem uma nova notificação de post.';
      }
    }

    // Ticket
    if (id_ticket) {
      switch (tipo_notificacao) {
        case 'Sucesso':
          return 'O seu ticket foi resolvido com sucesso.';
        case 'Insucesso':
          return 'O seu ticket não pôde ser resolvido.';
        case 'Validacao':
          return 'Novo ticket para validação pela moderação.';
        default:
          return 'Tem uma nova notificação de ticket.';
      }
    }

    // Fallback
    return 'Tem uma nova notificação.';
  };

  return (
    <div className="notificacoes-dropdown" style={{ position: 'relative' }}>
      <button onClick={toggleDropdown} className="botao-notificacoes">
        <img src={notificationIcon} alt="Notificações" />
      </button>

      {isOpen && (
        <div className="dropdown-content">
          {notificacoes.length === 0 ? (
            <div className="sem-notificacoes">Sem notificações.</div>
          ) : (
            notificacoes.map((notif) => {
              const dataObj = new Date(notif.data);
              const dataFmt = dataObj.toLocaleDateString('pt-PT');
              const horaFmt = dataObj.toLocaleTimeString('pt-PT', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={notif.id_notificacao} className="notificacao-item">
                  <img
                    src={notificationIcon}
                    alt="Ícone"
                    className="icone-notificacao"
                  />
                  <div className="texto-notificacao">
                    {renderMensagem(notif)}
                  </div>
                  <div className="meta-notificacao">
                    <span className="data-notificacao">{dataFmt}</span>{' '}
                    <span className="hora-notificacao">{horaFmt}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
