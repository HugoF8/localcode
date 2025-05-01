import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Home.css';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import BotaoSeguir from '../componentes/PaginaFreguesia/Seguir';
import CriarPost from '../componentes/CriarPost';

function HomeFreguesia() {
  const { id } = useParams();            // <-- pega o :id da URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3000/api/posts/verPostsPagina?id_pagina=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (!res.ok) throw new Error('Erro ao carregar posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('Falha ao carregar posts. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />

        <div className="zona-publicacoes">
          {/* Botão de seguir à página */}
          <BotaoSeguir />

          {/* Formulário de criação de post — SEMPRE visível */}
          <CriarPost />

          {/* Estado de carregamento */}
          {loading && <p>Carregando posts...</p>}

          {/* Mensagem de erro */}
          {error && <p className="error">{error}</p>}

          {/* Lista de posts apenas se não estiver carregando nem houver erro */}
          {!loading && !error && posts.map(post => (
            <div key={post.id_post} className="post-card">
              <p>
                <strong>{post.utilizador.nome}:</strong> {post.descricao_post}
              </p>
              {post.media_post && (
                <img
                  src={`http://localhost:3000/${post.media_post}`}
                  alt=""
                  className="post-img"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeFreguesia;