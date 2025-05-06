import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CriarTicket() {
  const { id } = useParams(); // id da página de freguesia
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    const token = localStorage.getItem('token');
    const id_utilizador = Number(localStorage.getItem('id_utilizador'));

    try {
      const res = await fetch('http://localhost:3000/api/tickets/criarTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          descricao_problema: descricao,
          id_utilizador,
          id_pagina: Number(id)
        })
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.error || 'Erro desconhecido');
      }

      await res.json();
      alert('Ticket enviado com sucesso!');
      navigate(`/Pagina/${id}`);
    } catch (err) {
      console.error('Erro ao criar ticket:', err);
      setErro(err.message);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      {erro && <div className="erro">{erro}</div>}

      <div className="form-group">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          placeholder="Descrição do problema"
          rows={5}
          required
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-enviar">
        Enviar
      </button>
    </form>
  );
}
