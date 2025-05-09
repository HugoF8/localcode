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
  const token = localStorage.getItem('token');
  const currentUserId = Number(localStorage.getItem('id_utilizador'));
  
  console.log('BotaoModerador Debug:', {
    currentUserId,
    targetUserId,
    idDonoPagina,
    isModeradorNaPagina
  });


const handleClick = async () => {
  setLoading(true);
  try {
    const url = isModeradorNaPagina
      ? 'http://localhost:3000/api/moderadores/removerModeradorPagina'
      : 'http://localhost:3000/api/moderadores/criarModeradorPagina';

    const method = isModeradorNaPagina ? 'DELETE' : 'POST';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_pagina: paginaAtualId,
        id_utilizador: targetUserId,
        ...(isModeradorNaPagina ? {} : { funcao: 'MODERADOR' })
      }),
    });

    if (!res.ok) throw new Error('Erro na operação com moderador');

    onSuccess?.();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <button onClick={handleClick} disabled={loading} className="botao-moderador">
      {loading
        ? 'A processar...'
        : isModeradorNaPagina
          ? 'Remover moderador'
          : 'Tornar moderador'}
    </button>
  );
};

export default BotaoModerador;