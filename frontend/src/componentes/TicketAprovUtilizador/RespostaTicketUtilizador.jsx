import React, { useEffect, useState } from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';

function RespostaTicketUtilizador({ idTicket, token }) {
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRespostas = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/respostasTickets/verRespostas/${idTicket}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Erro ao buscar respostas');
        const data = await response.json();
        setRespostas(data);
      } catch (error) {
        console.error('Erro ao carregar respostas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRespostas();
  }, [idTicket, token]);

  if (loading) return <p className="resposta-loading">🔄 A carregar respostas...</p>;
  if (respostas.length === 0) return <p className="resposta-vazia">❌ Este ticket ainda não tem respostas.</p>;

  return (
    <div className="respostas-wrapper">
      <h4 className="respostas-titulo">📋 Respostas</h4>
      {respostas.map((resposta) => (
        <div key={resposta.id_resposta} className={`resposta-card ${resposta.estado_resposta}`}>
          <p><strong>🕒 Data:</strong> {new Date(resposta.data_resposta).toLocaleString('pt-PT')}</p>
          <p><strong>📌 Estado:</strong> {resposta.estado_resposta === 'resolvido' ? 'Resolvido ✅' : 'Não resolvido ❌'}</p>
          <p><strong>💬 Conteúdo:</strong> {resposta.conteudo_resposta || 'Sem conteúdo.'}</p>
        </div>
      ))}
    </div>
  );
}

export default RespostaTicketUtilizador;