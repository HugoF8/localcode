import React from 'react';

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
        alert('Utilizador promovido a moderador com sucesso!');
        if (onSuccess) onSuccess(data);
      })
      .catch((err) => {
        console.error('Erro ao promover a moderador:', err);
        alert('Erro ao promover utilizador.');
      });
  };

  // Só mostra se ainda não for moderador NAQUELA página e quem está autenticado tiver permissão
  if (isModeradorNaPagina || !temPermissaoNaPagina) return null;

  return (
    <button onClick={tornarModerador} className="btn-moderador">
      Tornar Moderador
    </button>
  );
}

export default BotaoModerador;