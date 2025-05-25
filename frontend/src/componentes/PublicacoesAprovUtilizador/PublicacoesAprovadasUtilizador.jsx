"use client"
import PublicacaoGenerica from "../genericos/Publicacao"
import FiltrarPorData from "../FiltrarPorData"
import "../../styles/AprovacoesTicketsePublicacoes.css"

export default function PublicacoesAprovadasUtilizador({ posts, expandidoId, onToggleExpand }) {
  return (
    <FiltrarPorData
      dados={posts}
      campoData="data_post"
      titulo="Publicações Aprovadas"
      renderItem={(post) => {
        const isExpanded = expandidoId === post.id_post

        // Botão de toggle para expandir/colapsar
        const ToggleButton = () => (
          <button
            className="ticket-toggle"
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpand(post.id_post)
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
        )

        return (
          <div key={post.id_post} className="publicacao-container-expansivel">
            <PublicacaoGenerica
              id={post.id_post}
              descricao={isExpanded ? post.descricao_post : null}
              data={post.data_post}
              media={isExpanded ? post.media_post : null}
              utilizador={post.utilizador}
              className="aprovada publicacao-expansivel"
              compact={!isExpanded}
              actions={<ToggleButton />}
            />
          </div>
        )
      }}
    />
  )
}
