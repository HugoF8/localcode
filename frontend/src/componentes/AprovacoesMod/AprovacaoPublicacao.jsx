"use client"

import { useState } from "react"
import PublicacaoGenerica from "../genericos/Publicacao"
import BotoesAR from "../genericos/BotoesAprovarRecusar"
import UserProfilePopup from "../PerfilUtilizadorClick"

function AprovacaoPublicacaoNova({ publicacoes, onAprovar, onRecusar }) {
  const [selectedUserId, setSelectedUserId] = useState(null)

  const handleUserClick = (userId) => {
    console.log("Cliquei! userId =", userId)
    setSelectedUserId(userId)
  }

  return (
    <div className="aprovacoes-container">
      <div className="titulo-centralizado">
        <h2 className="aprovacoes-titulo">Aprovação de Publicações</h2>
      </div>

      <div className="publicacoes-list">
        {publicacoes.map((pub) => (
          <PublicacaoGenerica
            key={pub.id}
            id={pub.id}
            descricao={pub.descricao_post || pub.descricao}
            data={pub.data_post}
            media={pub.media_post}
            utilizador={pub.utilizador}
            onUserClick={handleUserClick}
            className="pendente"
            actions={<BotoesAR onAprovar={() => onAprovar(pub.id)} onRecusar={() => onRecusar(pub.id)} />}
          />
        ))}
      </div>

      {selectedUserId && <UserProfilePopup userId={selectedUserId} onClose={() => setSelectedUserId(null)} />}
    </div>
  )
}

export default AprovacaoPublicacaoNova
