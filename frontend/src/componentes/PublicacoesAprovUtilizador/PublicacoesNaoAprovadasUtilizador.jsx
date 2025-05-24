import React from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import BotaoAA from '../genericos/BotaoAlterar';

export default function PublicacoesNaoAprovadasUtilizador({
  posts,
  expandidoId,
  onToggleExpand,
  onInputChange,
  onFileChange,
  onAlterar,
  onApagar
}) {
  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">Não Aprovadas</h1>

      {posts.map((post) => {
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

                {(post.file || post.media_post) && (
                  <div className="publicacao-preview">
                    <img
                      src={
                        post.file
                          ? URL.createObjectURL(post.file)
                          : `http://localhost:3000/${post.media_post}`
                      }
                      alt="Pré-visualização"
                      className="publicacao-img"
                    />
                  </div>
                )}

                <input
                  type="text"
                  className="ticket-input"
                  placeholder="Nova descrição"
                  value={post.input || ''}
                  onChange={(e) => onInputChange(post.id_post, e.target.value)}
                />
                <div class="flex_spacearound_gaptopo">
                <label className="ticket-file-label">
                  Substituir mídia:
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => onFileChange(post.id_post, e.target.files[0])}
                  />
                </label>
                <BotaoAA
                onAlterar={() => onAlterar(post.id_post)}
                onApagar={() => onApagar(post.id_post)}
                />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}