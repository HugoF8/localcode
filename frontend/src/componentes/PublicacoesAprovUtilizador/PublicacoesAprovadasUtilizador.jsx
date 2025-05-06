import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import FiltrarPorData from '../FiltrarPorData';

function PublicacoesAprovadasUtilizador({ posts, expandidoId, onToggleExpand }) {
  return (
    <FiltrarPorData
      dados={posts}
      campoData="data_post"
      titulo="Publicações Aprovadas"
      renderItem={(post) => (
        <div
          key={post.id_post}
          className={`ticket-card ${expandidoId === post.id_post ? 'expanded' : ''}`}
        >
          <div className="ticket-header">
            <div>
              <p className="ticket-user">{post.utilizador?.nome || 'Utilizador'}</p>
              <p className="ticket-date">
                {new Date(post.data_post).toLocaleDateString('pt-PT')}
              </p>
            </div>
            <div className="ticket-id">#{post.id_post}</div>
            <button className="ticket-toggle" onClick={() => onToggleExpand(post.id_post)}>
              {expandidoId === post.id_post ? '˄' : '˅'}
            </button>
          </div>

          {expandidoId === post.id_post && (
            <>
              <p className="ticket-description">{post.descricao_post}</p>
              {post.media_post && (
                <img
                  src={`/${post.media_post}`}
                  alt="Imagem do post"
                  className="publicacao-img"
                />
              )}
            </>
          )}
        </div>
      )}
    />
  );
}

export default PublicacoesAprovadasUtilizador;