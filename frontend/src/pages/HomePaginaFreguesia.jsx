import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import BotaoSeguir from '../componentes/PaginaFreguesia/Seguir';
import CriarPost from '../componentes/CriarPost';

function HomeFreguesia() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3000/api/verPostsPagina?id_pagina=${idPagina}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Erro ao carregar posts');

        const resultado = await response.json();
        setPosts(resultado); 

      } catch (error) {
        console.error('Erro ao procurar posts:', error);
        setError('Falha ao carregar posts. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [idPagina]);

  if (loading) return <p>Carregando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
      <BotaoSeguir />
      <div className="zona-publicacoes">
          {/* Form de criação de post */}
          <CriarPost />
          {/* Aqui renderiza os posts existentes */}
          {posts.map(post => (
            <div key={post.id_post} className="post-card">
              <p><strong>{post.utilizador.nome}:</strong> {post.descricao_post}</p>
              {post.media_post && (
                <img src={`http://localhost:3000/${post.media_post}`} alt="" className="post-img" />
              )}
            </div>
          ))}
        </div>
      </div>  
    </div>
  );
}

export default HomeFreguesia;