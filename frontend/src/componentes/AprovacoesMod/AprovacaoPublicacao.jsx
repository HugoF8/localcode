"use client"
import { useState } from "react"
import PublicacaoGenerica from "../genericos/Publicacao"
import BotoesAR from "../genericos/BotoesAprovarRecusar"
import UserProfilePopup from "../PerfilUtilizadorClick"

function AprovacaoPublicacaoNova({ 
  publicacoes, 
  onAprovar, 
  onRecusar,
  token
}) {
  const [selectedUserId, setSelectedUserId] = useState(null)

  const handleUserClick = (userId) => {
    if (!userId) {
      return;
    }
    setSelectedUserId(userId);
  }

  const handleClosePopup = () => {
    setSelectedUserId(null);
  }

  return (
    <div className="aprovacoes-container">
      <div className="titulo-centralizado">
        <h2 className="aprovacoes-titulo">Aprovação de Publicações</h2>
      </div>

      <div className="publicacoes-list">
        {publicacoes.map((pub, index) => (
          <PublicacaoGenerica
            key={pub.id}
            id={pub.id}
            descricao={pub.descricao_post || pub.descricao}
            data={pub.data_post}
            media={pub.media_post}
            utilizador={{
              ...pub.utilizador,
              id_utilizador: pub.id_utilizador
            }}
            onUserClick={handleUserClick}
            className="pendente"
            actions={<BotoesAR onAprovar={() => onAprovar(pub.id)} onRecusar={() => onRecusar(pub.id)} />}
          />
        ))}
      </div>

      {selectedUserId && (
        <UserProfilePopup 
          userId={selectedUserId} 
          onClose={handleClosePopup}
          token={token}
          paginaAtualId={null}
          currentUserId={null}
          idDonoPagina={null}
          isModeradorNaPagina={false}
          isPageOwner={false}
        />
      )}
    </div>
  )
}

export default AprovacaoPublicacaoNova