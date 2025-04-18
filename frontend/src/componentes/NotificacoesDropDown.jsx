import React, { useState } from 'react';
import axios from 'axios';
import notificationIcon from '../assets/notification-icon.png';

export default function NotificacoesDropDown({ id_utilizador }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = async () => {
      if (!isOpen) {
          try {
              const res = await axios.get(`/api/notificacao/verNotificacaoPorUtilizador/${id_utilizador}`);
              const ultimasTres = res.data
                  .sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao))
                  .slice(0, 3);
              setNotificacoes(ultimasTres);
          } catch (err) {
              console.error("Erro ao buscar notificações:", err);
          }
      }
      setIsOpen(!isOpen);
  };

  return (
      <div className="notificacoes-dropdown">
          <button onClick={toggleDropdown} className="botao-notificacoes">
              <img src={notificationIcon} alt="Notificações" className="h-6 w-6" />
          </button>

          {isOpen && (
              <div className="dropdown-content">
                  {notificacoes.length === 0 ? (
                      <div className="sem-notificacoes">Sem notificações.</div>
                  ) : (
                      notificacoes.map((notif, index) => (
                          <div key={index} className="notificacao-item">
                              <img src={notificationIcon} alt="Ícone" className="icone-notificacao" />
                              <div className="texto-notificacao">
                                  <p className="text-sm">
                                      Deu agora entrada um <strong>Post</strong> para{" "}
                                      {notif.tipo === "veracidade" ? (
                                          <>validação de <strong>veracidade</strong></>
                                      ) : (
                                          <strong>aprovação</strong>
                                      )}
                                  </p>
                              </div>
                              <span className="hora-notificacao">
                                  {new Date(notif.data_criacao).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                          </div>
                      ))
                  )}
              </div>
          )}
      </div>
  );
}
