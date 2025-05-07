import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BotaoModerador({ userId, isModeradorNaPagina, currentUser, paginaAtualId, onSuccess }) {
  const token = localStorage.getItem('token');

  // Verifica se o utilizador atual é moderador ou dono DA PÁGINA ATUAL
  const temPermissaoNaPagina =
    currentUser?.paginas?.some(
      (p) =>
        p.id === paginaAtualId &&
        (p.role === 'moderador' || p.role === 'dono')
    );

  const tornarModerador = () => {
    fetch(`http://localhost:3000/api/utilizadores/moderador/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paginaId: paginaAtualId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        toast.success('Utilizador promovido a moderador com sucesso!');
        if (onSuccess) onSuccess(data);
      })
      .catch((err) => {
        console.error('Erro ao promover a moderador:', err);
        toast.error('Erro ao promover utilizador.');
      });
  };

  // Só mostra se ainda não for moderador NAQUELA página e quem está autenticado tiver permissão
  if (isModeradorNaPagina || !temPermissaoNaPagina) return null;

  return (
    <div>
      <ToastContainer position="top-right" />
      <button onClick={tornarModerador} className="btn-moderador">
        Tornar Moderador
      </button>
    </div>
  );
}

export default BotaoModerador;