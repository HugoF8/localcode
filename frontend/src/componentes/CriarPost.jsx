// src/pages/CriarPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CriarPost.css';
import userPlaceholder from '../assets/landscape-placeholder.svg';
import BotaoE from './genericos/BotaoEnviar'


function CriarPost() {
  // Pega o parâmetro da rota: /Pagina/:id
  const { id: idPagina } = useParams();

  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  // Gera preview ao escolher imagem
  useEffect(() => {
    if (!imagem) return setPreview(null);
    const url = URL.createObjectURL(imagem);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imagem]);

  const handleImagemChange = (e) => {
    if (e.target.files.length) {
      setImagem(e.target.files[0]);
    }
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id_utilizador = localStorage.getItem('id_utilizador');

    if (!token) {
      return toast.error('Tem de iniciar sessão.');
    }
    if (!descricao.trim() && !imagem) {
      return toast.error('Escreve algo ou adiciona uma imagem.');
    }

    const formData = new FormData();
    formData.append('id_utilizador', id_utilizador);
    formData.append('id_pagina', idPagina);
    formData.append('descricao_post', descricao);
    if (imagem) formData.append('media_post', imagem);

    try {
      const res = await fetch('http://localhost:3000/api/posts/criarPost', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success('Publicação criada!');
        setDescricao('');
        setImagem(null);
      } else {
        toast.error(data.error || 'Erro ao publicar');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro de rede');
    }
  };

  return (
    <div className="criar-post">
      <form onSubmit={handlePublicar} className="form-post">
        <input
          type="text"
          placeholder="No que estás a pensar?"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="descricao-input"
        />

        <div className="acoes">
          <label className="btn-foto">
            🖼 Adicionar Imagem
            <input type="file" hidden accept="image/*" onChange={handleImagemChange} />
          </label>
          <BotaoE/>
        </div>
      </form>
    </div>
  );
}

export default CriarPost;
