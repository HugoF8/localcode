// src/pages/CriarPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CriarPost.css';
import userPlaceholder from '../assets/landscape-placeholder.svg';

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
    if (e.target.files.length) setImagem(e.target.files[0]);
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id_utilizador = localStorage.getItem('id_utilizador');

    if (!token) {
      return alert('Tem de iniciar sessão.');
    }
    if (!descricao.trim() && !imagem) {
      return alert('Escreve algo ou adiciona uma imagem.');
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
        alert('Publicação criada!');
        setDescricao('');
        setImagem(null);
      } else {
        alert(data.error || 'Erro ao publicar');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de rede');
    }
  };

  return (
    <div className="criar-post">
      <img src={userPlaceholder} alt="Perfil" className="foto-perfil" />
      <form onSubmit={handlePublicar} className="form-post">
        <input
          type="text"
          placeholder="No que estás a pensar?"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="descricao-input"
        />

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-img" />
            <button type="button" className="btn-remover-preview" onClick={() => setImagem(null)}>
              ✖️
            </button>
          </div>
        )}

        <div className="acoes">
          <label className="btn-foto">
            🖼 Adicionar Imagem
            <input type="file" hidden accept="image/*" onChange={handleImagemChange} />
          </label>
          <button type="submit" className="btn-publicar">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CriarPost;
