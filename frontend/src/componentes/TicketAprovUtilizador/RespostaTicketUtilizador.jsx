// src/components/RespostaTicketUtilizador.jsx
import React, { useEffect, useState } from 'react';

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

  if (loading) return <p>A carregar respostas...</p>;
  if (respostas.length === 0) return <p>Sem respostas para este ticket.</p>;

  return (
    <div className="respostas-wrapper">
      <h4>Respostas</h4>
      {respostas.length === 0 ? (
        <p>Este ticket ainda não tem respostas.</p>
      ) : (
        respostas.map((resposta) => (
          <div key={resposta.id_resposta} className="resposta">
            <p><strong>Data:</strong> {new Date(resposta.data_resposta).toLocaleString('pt-PT')}</p>
            <p><strong>Estado da Resposta:</strong> {resposta.estado_resposta}</p>
            <p><strong>Conteúdo:</strong> {resposta.conteudo_resposta || 'Sem conteúdo.'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RespostaTicketUtilizador;
