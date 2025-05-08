import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/notificacoes.css';
function TodasNotificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificacoes = async () => {
      const token = localStorage.getItem('token');
      const id_utilizador = Number(localStorage.getItem('id_utilizador'));
      try {
        const res = await fetch(
          `http://localhost:3000/api/notificacao/verNotificacaoPorUtilizador/${id_utilizador}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setNotificacoes(data.sort((a, b) => new Date(b.data) - new Date(a.data)));
      } catch (err) {
        console.error('Erro ao buscar notificações:', err);
      }
    };
    fetchNotificacoes();
  }, []);

  const renderMensagem = (notif) => {
    const { tipo_notificacao, id_post, id_ticket } = notif;

    const isPedido = !id_post && !id_ticket;

    if (isPedido) {
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

    return 'Tem uma nova notificação.';
  };

  return (
    <div className="notificacoes-container">
      <h1 className="titulo">📨 Todas as Notificações</h1>
      {notificacoes.length === 0 ? (
        <p className="sem-notificacoes">Sem notificações.</p>
      ) : (
        <ul className="lista-notificacoes">
          {notificacoes.map((notif) => (
            <li key={notif.id_notificacao} className="notificacao-item">
              <p className="mensagem"><strong>{renderMensagem(notif)}</strong></p>
              <p className="data">
                {new Date(notif.data).toLocaleDateString('pt-PT')} às{' '}
                {new Date(notif.data).toLocaleTimeString('pt-PT', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate(-1)} className="btn-voltar">← Voltar</button>
    </div>
  );
}

export default TodasNotificacoes;
