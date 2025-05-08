import { useState, useEffect } from 'react';
import '../../styles/Home.css';

function ZonaPublicacoesHome() {
const id = Number(localStorage.getItem('id_utilizador'));
  const [freguesia, setFreguesia] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchFreguesia = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/posts/verPostsPaginasSeguidas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) {
          throw new Error('Erro ao buscar posts');
        }
        
        console.log('ID da freguesia:', id);
        const data = await response.json();
  
        // Atualiza o estado de freguesia e posts
        setFreguesia(data);
        setPosts(data.publicacoes || []);  // Atualiza o estado de posts com as publicações, ou array vazio se não houver
      } catch (err) {
        console.error('Erro:', err);
        setFreguesia(null);
        setPosts([]);  // Se houver erro, limpa o estado dos posts
      }
    };
  
    fetchFreguesia();
  }, [id]);

  if (!freguesia) return <div>Carregando...</div>;

  return (
    <div className="zona-publicacoes">
      <div className="freguesia-container">
        {/* Imagem de capa da freguesia */}
        <div
          className="foto-capa-freguesia"
          style={{ backgroundImage: `url(${freguesia.foto_capa})` }}
        ></div>

        <div className="info-header">
          <div className="foto-perfil-container">
            {/* Foto de perfil da freguesia */}
            <img
              src={freguesia.foto_perfil}
              alt="Foto de perfil"
              className="foto-perfil-freguesia"
            />
          </div>
          <div className="nome-freguesia">
            <p>{freguesia.nome_pagina}</p>
          </div>
        </div>

        {/* Mostrar publicações */}
        <div className="posts-container">
          {posts.length === 0 ? (
            <p>Não há publicações para mostrar.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id_post} className="post">
                <div className="info-post">
                  <img
                    src={post.utilizador.perfil[0].foto_perfil}  // Usando o caminho correto para a foto de perfil do utilizador
                    alt={post.utilizador.nome}
                    className="foto-perfil-utilizador"
                  />
                  <p>{post.utilizador.nome}</p>
                </div>
                <div className="conteudo-post">
                  <p>{post.descricao_post}</p>
                  {post.media_post && (
                    <img
                      src={post.media_post}
                      alt="Mídia do post"
                      className="media-post"
                    />
                  )}
                </div>
                <div className="aprovações">
                  <p>Aprovações: {post.aprovacoes}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ZonaPublicacoesHome;
