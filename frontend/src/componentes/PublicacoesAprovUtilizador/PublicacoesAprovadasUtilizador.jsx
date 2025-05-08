import React from 'react';
import FiltrarPorData from '../FiltrarPorData';
import '../../styles/AprovacoesTicketsePublicacoes.css';

export default function PublicacoesAprovadasUtilizador({
  posts,
  expandidoId,
  onToggleExpand
}) {
  return (
    <FiltrarPorData
      dados={posts}
      campoData="data_post"
      titulo="Publicações Aprovadas"
      renderItem={(post) => {
        const autor = post.utilizador?.nome ?? 'Desconhecido';
        return (
          <div
            key={post.id_post}
            className={`ticket-card ${expandidoId === post.id_post ? 'expanded' : ''}`}
          >
            <div className="ticket-header">
              <div>
                <p className="ticket-user">{autor}</p>
                <p className="ticket-date">
                  {new Date(post.data_post).toLocaleDateString('pt-PT')}
                </p>
              </div>
              <div className="ticket-id">#{post.id_post}</div>
              <button
                className="ticket-toggle"
                onClick={() => onToggleExpand(post.id_post)}
              >
                {expandidoId === post.id_post ? '˄' : '˅'}
              </button>
            </div>

            {expandidoId === post.id_post && (
              <>
                <p className="ticket-description">{post.descricao_post}</p>
                {post.media_post && (
                  <img
                    src={`http://localhost:3000/${post.media_post}`}
                    alt="Imagem do post"
                    className="publicacao-img"
                    onError={e => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'http://localhost:3000/uploads/default.jpg';
                    }}
                  />
                )}
              </>
            )}
          </div>
        );
      }}
    />
  );
}