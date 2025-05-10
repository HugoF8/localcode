import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import '../../styles/Home.css';
import UserProfilePopup from '../PerfilUtilizadorClick';
import placeholder from '../../assets/landscape-placeholder.svg';

export default function PostsFreguesia() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [pageOwner, setPageOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userIsModerator, setUserIsModerator] = useState(false);
  const [moderadores, setModeradores] = useState([]);
  const [isSelectedUserModerador, setIsSelectedUserModerador] = useState(false);

  const currentUserId = Number(localStorage.getItem('id_utilizador'));

  useEffect(() => {
    const checkModeratorStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/moderadores/verPaginasModeradas/${currentUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const moderacoes = await res.json();
        setUserIsModerator(moderacoes.some(p => p.id_pagina === Number(id)));
        setModeradores(moderacoes);
      } catch (err) {
        console.error('Erro ao verificar status de moderador:', err);
      }
    };

    if (currentUserId) {
      checkModeratorStatus();
    }
  }, [id, currentUserId]);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/posts/verPostsPagina/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setPosts(await res.json());
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPosts();
  }, [id]);

  useEffect(() => {
    async function fetchPageOwner() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const page = await res.json();
        if (page && page.id_utilizador !== undefined) {
          setPageOwner(page.id_utilizador);
        }
      } catch (err) {
        console.error('Erro ao buscar dono da página:', err);
      }
    }
    if (id) fetchPageOwner();
  }, [id]);

  useEffect(() => {
    if (selectedUserId !== null && moderadores.length > 0) {
      const isMod = moderadores.some(
        m =>
          m.id_pagina === Number(id) &&
          m.id_utilizador === Number(selectedUserId)
      );
      setIsSelectedUserModerador(isMod);
    }
  }, [selectedUserId, moderadores, id]);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!posts.length) return <p>Sem posts disponíveis para esta página.</p>;


  const buildImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `http://localhost:3000/${path}`;
  };


  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <p>Não há publicações para mostrar.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id_post} className="post">
            {/* 1. Info da freguesia */}
            <div className="info-freguesia-post">
              {post.pagina_freguesia?.foto_perfil && (
                <img
                  src={buildImageUrl(post.pagina_freguesia.foto_perfil)}
                  alt={post.pagina_freguesia.nome_pagina}
                  className="freguesia-img"
                />
              )}
              <p className="freguesia-nome">{post.pagina_freguesia?.nome_pagina}</p>
            </div>

            {/* 2. Info do utilizador */}
            <div
              className="info-post"
              onClick={() => setSelectedUserId(post.id_utilizador)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={
                  post.utilizador?.perfil?.[0]?.foto_perfil
                    ? buildImageUrl(post.utilizador.perfil[0].foto_perfil)
                    : placeholder
                }
                alt={post.utilizador?.nome || 'Utilizador'}
                className="foto-perfil-utilizador"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholder;
                }}
              />
              <div className="nomeData-container">
                <p className="utilizador-nome">{post.utilizador?.nome || 'Desconhecido'}</p>
                <p className="ticket-date">{new Date(post.data_post).toLocaleDateString()}</p>
              </div>
            </div>

            {/* 3. Conteúdo do post */}
            <div className="conteudo-post">
              <p>{post.descricao_post}</p>
              {post.media_post && (
                <div className="img-container">
                  <img
                    src={buildImageUrl(post.media_post)}
                    alt="Mídia do post"
                    className="media-post"
                  />
                </div>
              )}
            </div>
          </div>
        ))
      )}

      {selectedUserId && pageOwner !== null && (
        <UserProfilePopup
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          paginaAtualId={Number(id)}
          currentUserId={currentUserId}
          idDonoPagina={pageOwner}
          isModeradorNaPagina={isSelectedUserModerador}
          isPageOwner={currentUserId === pageOwner}
        />
      )}
    </div>
  );
}
