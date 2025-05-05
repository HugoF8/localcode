// src/componentes/NotificacoesDropDown.jsx
import React, { useState } from 'react';
import notificationIcon from '../../assets/notification-icon.png';

export default function NotificacoesDropDown() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = async () => {
    // Lê token e id do localStorage
    const token = localStorage.getItem('token');
    const id_utilizador = Number(localStorage.getItem('id_utilizador'));

    if (!token || !id_utilizador) {
      console.warn('Usuário não autenticado ou id_utilizador em falta');
      return;
    }

    // Ao abrir, busca as notificações
    if (!isOpen) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/notificacao/verNotificacaoPorUtilizador/${id_utilizador}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!res.ok) throw new Error('Erro ao buscar notificações');
        const data = await res.json();

        // Ordena por data desc e pega as 5 primeiras
        const ultimasCinco = data
          .sort((a, b) => new Date(b.data) - new Date(a.data))
          .slice(0, 5);

        setNotificacoes(ultimasCinco);
      } catch (err) {
        console.error(err);
      }
    }

    setIsOpen(open => !open);
  };

  return (
    <div className="notificacoes-dropdown">
      <button onClick={toggleDropdown} className="botao-notificacoes">
        <img src={notificationIcon} alt="Notificações" />
      </button>

      {isOpen && (
        <div className="dropdown-content">
          {notificacoes.length === 0 ? (
            <div className="sem-notificacoes">Sem notificações.</div>
          ) : (
            notificacoes.map((notif) => (
              <div key={notif.id_notificacao} className="notificacao-item">
                <img
                  src={notificationIcon}
                  alt="Ícone"
                  className="icone-notificacao"
                />
                <div className="texto-notificacao">
                  {notif.conteudo_notificacao || 'Nova notificação'}
                </div>
                <span className="hora-notificacao">
                  {new Date(notif.data).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}