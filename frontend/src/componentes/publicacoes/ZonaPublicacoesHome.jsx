"use client"

import { useState, useEffect } from "react"
import PublicacaoGenerica from "../genericos/Publicacao"
import UserProfilePopup from "../PerfilUtilizadorClick"
import "../../styles/Home.css"

function ZonaPublicacoesHome() {
  const [posts, setPosts] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts/verPostsPaginasSeguidas", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error("Erro ao buscar posts")
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        console.error("Erro:", err)
        setPosts([])
      }
    }

    fetchPosts()
  }, [token])

  const handleUserClick = (userId) => {
    setSelectedUserId(userId)
  }

  const handleClosePopup = () => {
    setSelectedUserId(null)
  }

  return (
    <>
      <div className="publicacoes-list-home">
        {posts.length === 0 ? (
          <p className="no-posts-message">Não há publicações para mostrar.</p>
        ) : (
          posts.map((post) => {
            // Garantir que temos o id_utilizador correto
            const userId = post.id_utilizador || post.utilizador?.id_utilizador

            return (
              <PublicacaoGenerica
                key={post.id_post}
                descricao={post.descricao_post}
                data={post.data_post}
                media={post.media_post}
                utilizador={{
                  ...post.utilizador,
                  id_utilizador: userId,
                }}
                pagina={post.pagina_freguesia}
                showPagina={true}
                onUserClick={handleUserClick}
                className="card--home"
              />
            )
          })
        )}
      </div>

      {/* Popup do utilizador */}
      {selectedUserId && (
        <UserProfilePopup
          userId={selectedUserId}
          onClose={handleClosePopup}
          token={token}
          paginaAtualId={null}
          currentUserId={Number(localStorage.getItem("id_utilizador"))}
          idDonoPagina={null}
          isModeradorNaPagina={false}
          isPageOwner={false}
        />
      )}
    </>
  )
}

export default ZonaPublicacoesHome
