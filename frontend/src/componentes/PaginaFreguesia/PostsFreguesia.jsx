import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/AprovacoesTicketsePublicacoes.css';
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

  return (
    <div className="aprovacoes-container">
      <div className="titulo-centralizado">
        <h2 className="aprovacoes-titulo">Publicações da Freguesia</h2>
      </div>

      {posts.map(post => (
        <div key={post.id_post} className="ticket-card">
          <div className="ticket-header">
            <div
              className="ticket-user-info"
              onClick={() => setSelectedUserId(post.id_utilizador)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={
                  post.utilizador?.perfil?.[0]?.foto_perfil
                    ? `http://localhost:3000/${post.utilizador.perfil[0].foto_perfil}`
                    : placeholder
                }
                onError={e => { e.target.onerror = null; e.target.src = placeholder; }}
                alt={post.utilizador?.nome || 'Utilizador'}
                className="ticket-user-img"
              />
              <p className="ticket-user">{post.utilizador?.nome || 'Desconhecido'}</p>
            </div>

            <div className="ticket-id">#{post.id_post}</div>
          </div>

          <p className="ticket-date">{new Date(post.data_post).toLocaleDateString()}</p>

          <p className="ticket-description">{post.descricao_post}</p>

          {post.media_post && (
            <div className="publicacao-conteudo-central">
              <img
                src={`http://localhost:3000/${post.media_post}`}
                alt="Imagem do post"
                className="publicacao-img"
              />
            </div>
          )}
        </div>
      ))}

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
