import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostsFreguesia() {
  const { id } = useParams(); // usa o "id" da rota
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/posts/verPostsPagina/${id}`,
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPosts();
  }, [id]);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!posts.length) return <p>Sem posts disponíveis para esta página.</p>;

  return (
    <div className="posts-grid">
      {posts.map(post => (
        <div key={post.id_post} className="post-card">
          <p><strong>{post.utilizador.nome}:</strong> {post.descricao_post}</p>
          {post.media_post && (
            <img
              src={`http://localhost:3000/${post.media_post}`}
              alt="Imagem do post"
              className="post-img"
            />
          )}
          <p><small>{new Date(post.data_post).toLocaleString()}</small></p>
        </div>
      ))}
    </div>
  );
}