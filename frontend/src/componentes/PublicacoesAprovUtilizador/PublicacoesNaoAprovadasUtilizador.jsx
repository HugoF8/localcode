import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';

function PublicacoesNaoAprovadasUtilizador({ posts, expandidoId, onToggleExpand, onInputChange, onAlterar, onApagar }) {
  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">Não Aprovadas</h1>

      {posts.map((post) => (
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
              <input
                type="text"
                className="ticket-input"
                value={post.input || ''}
                onChange={(e) => onInputChange(post.id_post, e.target.value)}
              />
              <div className="ticket-actions">
                <button className="btn-aprovar" onClick={() => onAlterar(post.id_post)}>Alterar</button>
                <button className="btn-recusar" onClick={() => onApagar(post.id_post)}>Apagar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PublicacoesNaoAprovadasUtilizador;