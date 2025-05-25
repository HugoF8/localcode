"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PublicacaoGenerica from "../genericos/Publicacao"
import UserProfilePopup from "../PerfilUtilizadorClick"
import "../../styles/AprovacoesTicketsePublicacoes.css"
import "../../styles/Home.css"

export default function PostsFreguesia() {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [pageOwner, setPageOwner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [userIsModerator, setUserIsModerator] = useState(false)
  const [moderadores, setModeradores] = useState([])
  const [isSelectedUserModerador, setIsSelectedUserModerador] = useState(false)

  const currentUserId = Number(localStorage.getItem("id_utilizador"))
  const token = localStorage.getItem("token")

  useEffect(() => {
    const checkModeratorStatus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/moderadores/verPaginasModeradas/${currentUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const moderacoes = await res.json()
        setUserIsModerator(moderacoes.some((p) => p.id_pagina === Number(id)))
        setModeradores(moderacoes)
      } catch (err) {
        console.error("Erro ao verificar status de moderador:", err)
      }
    }

    if (currentUserId) {
      checkModeratorStatus()
    }
  }, [id, currentUserId, token])

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:3000/api/posts/verPostsPagina/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const postsData = await res.json()
        setPosts(postsData)
      } catch (err) {
        console.error("Erro ao buscar posts:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchPosts()
  }, [id, token])

  useEffect(() => {
    async function fetchPageOwner() {
      try {
        const res = await fetch(`http://localhost:3000/api/paginaFreguesias/paginaFreguesia/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const page = await res.json()
        if (page && page.id_utilizador !== undefined) {
          setPageOwner(page.id_utilizador)
        }
      } catch (err) {
        console.error("Erro ao buscar dono da página:", err)
      }
    }
    if (id) fetchPageOwner()
  }, [id, token])

  useEffect(() => {
    if (selectedUserId !== null && moderadores.length > 0) {
      const isMod = moderadores.some((m) => m.id_pagina === Number(id) && m.id_utilizador === Number(selectedUserId))
      setIsSelectedUserModerador(isMod)
    }
  }, [selectedUserId, moderadores, id])

  const handleUserClick = (userId) => {
    setSelectedUserId(userId)
  }

  const handleClosePopup = () => {
    setSelectedUserId(null)
  }

  if (loading) return <p>Carregando posts...</p>
  if (error) return <p className="error">{error}</p>
  if (!posts.length) return <p>Sem posts disponíveis para esta página.</p>

  return (
    <>
      {/* Container em grid para as publicações */}
      <div className="publicacoes-grid-freguesia">
        {posts.map((post) => {
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
              compact={true}
              onUserClick={handleUserClick}
              className="card--primary card--freguesia"
            />
          )
        })}
      </div>

      {/* Popup do utilizador */}
      {selectedUserId && pageOwner !== null && (
        <UserProfilePopup
          userId={selectedUserId}
          onClose={handleClosePopup}
          paginaAtualId={Number(id)}
          currentUserId={currentUserId}
          idDonoPagina={pageOwner}
          isModeradorNaPagina={isSelectedUserModerador}
          isPageOwner={currentUserId === pageOwner}
          token={token}
        />
      )}
    </>
  )
}
