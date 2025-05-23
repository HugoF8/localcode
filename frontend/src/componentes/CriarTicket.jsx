import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/EnviarTicket.css';

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
  const isPublic = document.getElementById('slide').checked;

  try {
    const ticketRes = await fetch('http://localhost:3000/api/tickets/criarTicket', {
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

    if (!ticketRes.ok) {
      const payload = await ticketRes.json();
      throw new Error(payload.error || 'Erro ao criar ticket');
    }

    if (isPublic) {
      // criar também o post
      const postRes = await fetch('http://localhost:3000/api/posts/criarPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          descricao_post: descricao,
          id_utilizador,
          id_pagina: Number(id)
        })
      });

      if (!postRes.ok) {
        const payload = await postRes.json();
        console.error('Erro ao criar post:', payload.error);
        toast.warn('Ticket criado, mas houve um erro ao criar o post público.');
      }
    }

    toast.success('Ticket enviado com sucesso!', {
      onClose: () => navigate(`/Pagina/${id}`),
      autoClose: 2000
    });

  } catch (err) {
    console.error('Erro ao criar ticket:', err);
    toast.error(err.message || 'Erro ao criar ticket. Tenta novamente!');
  }
};



  return (
    <form className="formulario" onSubmit={handleSubmit}>
      {erro && <div className="erro">{erro}</div>}

      <div className="form-group">
        <ToastContainer position="top-right" />
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
     <div className="btnSwitchMain">
      <button type="submit" className="btn-enviarTicket">
        Enviar
      </button>
      <div className="switchContainer">
        <span className="switchLabel">Criar Post Público</span>
        <input type="checkbox" id="slide" />
        <label htmlFor="slide" className="toggleSwitch"></label>
      </div>
    </div>
    </form>
  );
}
