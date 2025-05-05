import { useEffect, useState } from 'react';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import BarraPublicacoesEticketsMod from '../componentes/BarraPublicacoesEticketsMod';
import AprovacaoPublicacao from '../componentes/AprovacaoPublicacao';
import '../styles/AprovacoesTicketsePublicacoes.css';

function AprovacoesPublicacoes() {
  const [publicacoes, setPublicacoes] = useState([]);
  const token = localStorage.getItem('token');
  const idPagina = 1;

  useEffect(() => {
    console.log('Token:', token);
    fetch(`http://localhost:3000/api/posts/verPostsPendentes/${idPagina}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,    // ← entre crases e aspas
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Recebido:', data);
        // mapeia id_post para id para alinhar com a tua key
        setPublicacoes(
          Array.isArray(data)
            ? data.map((p) => ({ ...p, id: p.id_post }))
            : []
        );
      })
      .catch((err) => {
        console.error('Erro no fetch das publicações:', err);
      });
  }, [token]);

  const atualizarPublicacao = (id, bolean) => {
    fetch(`http://localhost:3000/api/posts/atualizarPostsPendentes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // ← entre crases e aspas
      },
      body: JSON.stringify({ bolean }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setPublicacoes((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error('Erro ao atualizar publicação:', err);
      });
  };

  return (
    <div className="container">
      <BarraSuperior />
      <div className="flex">
        <BarraLateral />
        <div className="conteudo">
          <BarraPublicacoesEticketsMod />
          <AprovacaoPublicacao
            publicacoes={publicacoes}
            onAprovar={(id) => atualizarPublicacao(id, true)}
            onRecusar={(id) => atualizarPublicacao(id, false)}
          />
        </div>
      </div>
    </div>
  );
}

export default AprovacoesPublicacoes;