// BotaoModerador.jsx
import React, { useState } from 'react';

const BotaoModerador = ({
  isModeradorNaPagina,
  paginaAtualId,
  targetUserId,
  idDonoPagina,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const currentUserId = Number(localStorage.getItem('id_utilizador'));

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
     const method = isModeradorNaPagina ? 'DELETE' : 'POST';
      const url = isModeradorNaPagina
        ? `http://localhost:3000/api/moderadores/removerModeradorPagina/${paginaAtualId}/${targetUserId}`
        : 'http://localhost:3000/api/moderadores/criarModeradorPagina';

      const requestData = isModeradorNaPagina
        ? null
        : {
            id_pagina: Number(paginaAtualId),
            id_utilizador: Number(targetUserId),
            funcao: 'moderador'
          };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        ...(requestData && { body: JSON.stringify(requestData) })
      });


      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || 'Erro ao atualizar moderador.');
      }

      alert(isModeradorNaPagina
        ? 'Moderador removido com sucesso.'
        : 'Utilizador promovido a moderador.');

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Erro na operação:', err);
      setError(err.message || 'Erro ao processar a operação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="botao-moderador"
      >
        {loading
          ? 'A processar...'
          : isModeradorNaPagina
            ? 'Remover moderador'
            : 'Tornar moderador'}
      </button>
      {error && (
        <p className="erro-moderador" style={{ color: 'red', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </>
  );
};

export default BotaoModerador;
