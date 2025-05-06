import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostsFreguesia() {
  const { freguesia } = useParams(); // por exemplo, "Lisboa"
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8800/api/posts/freguesia/${freguesia}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os posts da freguesia.');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar posts. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (freguesia) {
      fetchPosts();
    }
  }, [freguesia]);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p className="error">{error}</p>;
  if (posts.length === 0) return <p>Sem posts disponíveis para esta freguesia.</p>;

  return (
    <div className="container">
      <h2>Posts da Freguesia: {freguesia}</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.idposts} className="post-card">
            <h3>{post.titulo}</h3>
            {post.imagem && (
              <img
                src={`http://localhost:8800/uploads/${post.imagem}`}
                alt="Imagem do post"
                className="post-img"
              />
            )}
            <p>{post.descricao}</p>
            <p><strong>Autor:</strong> {post.nome_utilizador}</p>
            <p><strong>Data:</strong> {new Date(post.data_criacao).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsFreguesia;