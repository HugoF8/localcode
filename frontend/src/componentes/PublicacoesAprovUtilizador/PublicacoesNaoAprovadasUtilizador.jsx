"use client"
import { useCallback } from "react"
import PublicacaoGenerica from "../genericos/Publicacao"
import BotaoAA from "../genericos/BotaoAlterar"
import "../../styles/AprovacoesTicketsePublicacoes.css"

export default function PublicacoesNaoAprovadasUtilizador({
  posts,
  expandidoId,
  onToggleExpand,
  onInputChange,
  onFileChange,
  onAlterar,
  onApagar,
}) {
  // Handler otimizado para input
  const handleInputChange = useCallback(
    (postId, value) => {
      onInputChange(postId, value)
    },
    [onInputChange],
  )

  // Handler otimizado para toggle
  const handleToggle = useCallback(
    (postId) => {
      onToggleExpand(postId)
    },
    [onToggleExpand],
  )

  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">Não Aprovadas</h1>

      {posts.map((post) => {
        const isExpanded = expandidoId === post.id_post

        return (
          <div key={post.id_post} className="publicacao-container-expansivel">
            <PublicacaoGenerica
              id={post.id_post}
              descricao={isExpanded ? post.descricao_post : null}
              data={post.data_post}
              media={null}
              utilizador={post.utilizador}
              className="recusada publicacao-expansivel"
              compact={!isExpanded}
              actions={
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {/* Botão toggle */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggle(post.id_post)
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        padding: "0.5rem",
                        color: "#6c757d",
                      }}
                    >
                      {isExpanded ? "˄" : "˅"}
                    </button>
                  </div>

                  {/* Conteúdo expandido */}
                  {isExpanded && (
                    <div style={{ width: "100%" }}>
                      {/* Preview da imagem */}
                      {(post.file || post.media_post) && (
                        <div style={{ marginBottom: "1rem" }}>
                          <img
                            src={
                              post.file ? URL.createObjectURL(post.file) : `http://localhost:3000/${post.media_post}`
                            }
                            alt="Pré-visualização"
                            style={{
                              width: "100%",
                              maxHeight: "300px",
                              objectFit: "contain",
                              borderRadius: "8px",
                              border: "1px solid #e9ecef",
                            }}
                          />
                        </div>
                      )}

                      {/* Campo de input */}
                      <div style={{ marginBottom: "1rem" }}>
                        <input
                          type="text"
                          placeholder="Nova descrição"
                          value={post.input || ""}
                          onChange={(e) => handleInputChange(post.id_post, e.target.value)}
                          autoComplete="off"
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      {/* Controles */}
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                          flexWrap: "wrap",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{
                            padding: "0.75rem",
                            background: "#f8f9fa",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            cursor: "pointer",
                            textAlign: "center",
                            fontSize: "0.9rem",
                            minWidth: "200px",
                          }}
                        >
                          📁 Substituir mídia
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => onFileChange(post.id_post, e.target.files[0])}
                            style={{ display: "none" }}
                          />
                        </label>

                        <BotaoAA onAlterar={() => onAlterar(post.id_post)} onApagar={() => onApagar(post.id_post)} />
                      </div>
                    </div>
                  )}
                </div>
              }
            />
          </div>
        )
      })}
    </div>
  )
}
