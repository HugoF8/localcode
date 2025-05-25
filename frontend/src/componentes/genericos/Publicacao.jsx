"use client"
import "./Publicacao.css"

const PublicacaoGenerica = ({
  // Dados da publicação
  id,
  descricao,
  data,
  media,

  // Informações do utilizador
  utilizador,

  // Informações da página/freguesia (opcional)
  pagina,

  // Callbacks opcionais
  onUserClick,
  onPublicacaoClick,

  // Configurações visuais
  showPagina = false,
  compact = false,

  // Slot para ações personalizadas (botões, etc.)
  actions,

  // Classes CSS adicionais
  className = "",
}) => {
  const buildImageUrl = (path) => {
    if (!path) return "/placeholder.svg?height=40&width=40"
    return path.startsWith("http") ? path : `http://localhost:3000/${path}`
  }

  const handleUserClick = (e) => {
    e.stopPropagation()

    const userId = utilizador?.id_utilizador

    if (onUserClick && userId) {
      onUserClick(userId)
    }
  }

  const handlePublicacaoClick = () => {
    if (onPublicacaoClick) {
      onPublicacaoClick(id)
    }
  }

  return (
    <article
      className={`publicacao-generica ${compact ? "publicacao-generica--compact" : ""} ${className}`}
      onClick={handlePublicacaoClick}
    >
      {/* Header da publicação */}
      <header className="publicacao-header">
        {/* Informações da página/freguesia (se mostrar) */}
        {showPagina && pagina && (
          <div className="publicacao-pagina-info">
            {pagina.foto_perfil && (
              <img
                src={buildImageUrl(pagina.foto_perfil) || "/placeholder.svg"}
                alt={pagina.nome_pagina}
                className="publicacao-pagina-avatar"
              />
            )}
            <span className="publicacao-pagina-nome">{pagina.nome_pagina}</span>
          </div>
        )}

        {/* Informações do utilizador */}
        <div className="publicacao-user-info-container">
          <div
            className="publicacao-user-info"
            onClick={handleUserClick}
            style={{ cursor: onUserClick ? "pointer" : "default" }}
          >
            <img
              src={buildImageUrl(utilizador?.perfil?.[0]?.foto_perfil) || "/placeholder.svg"}
              alt={utilizador?.nome || "Utilizador"}
              className="publicacao-user-avatar"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=40&width=40"
              }}
            />
            <div className="publicacao-user-details">
              <span className="publicacao-user-nome">{utilizador?.nome || "Utilizador Desconhecido"}</span>
              <time className="publicacao-data">{new Date(data).toLocaleDateString("pt-PT")}</time>
            </div>
          </div>

          {/* ID da publicação (opcional, para contextos administrativos) */}
          {typeof id === "number" && <div className="publicacao-id">#{id}</div>}
        </div>
      </header>

      {/* Conteúdo da publicação */}
      <div className="publicacao-content">
        {descricao && <p className="publicacao-descricao">{descricao}</p>}

        {media && (
          <div className="publicacao-media-container">
            <img
              src={buildImageUrl(media) || "/placeholder.svg"}
              alt="Conteúdo da publicação"
              className="publicacao-media"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=200&width=400"
              }}
            />
          </div>
        )}
      </div>

      {/* Ações personalizadas (botões, etc.) */}
      {actions && <footer className="publicacao-actions">{actions}</footer>}
    </article>
  )
}

export default PublicacaoGenerica
