// src/components/ZonaPublicacoesHome.jsx

import { useState, useEffect } from 'react';
import '../../styles/Home.css';

function ZonaPublicacoesHome() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'http://localhost:3000/api/posts/verPostsPaginasSeguidas',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) throw new Error('Erro ao buscar posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Erro:', err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const buildImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3000/${path}`;
  };

  return (
    <div className="zona-publicacoes">
      <div className="posts-container">
        {posts.length === 0 ? (
          <p>Não há publicações para mostrar.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id_post} className="post">
              {/* 1. Info da freguesia */}
              <div className="info-freguesia-post">
                {post.pagina_freguesia.foto_perfil && (
                  <img
                    src={buildImageUrl(post.pagina_freguesia.foto_perfil)}
                    alt={post.pagina_freguesia.nome_pagina}
                    className="freguesia-img"
                  />
                )}
                <p className="freguesia-nome">
                  {post.pagina_freguesia.nome_pagina}
                </p>
              </div>

              {/* 2. Info do utilizador */}
              <div className="info-post">
                <img
                  src={buildImageUrl(post.utilizador.perfil[0]?.foto_perfil)}
                  alt={post.utilizador.nome}
                  className="foto-perfil-utilizador"
                />
                <p className="utilizador-nome">{post.utilizador.nome}</p>
              </div>

              {/* 3. Conteúdo do post */}
              <div className="conteudo-post">
                <p>{post.descricao_post}</p>
                {post.media_post && (
                  <img
                    src={buildImageUrl(post.media_post)}
                    alt="Mídia do post"
                    className="media-post"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ZonaPublicacoesHome;
