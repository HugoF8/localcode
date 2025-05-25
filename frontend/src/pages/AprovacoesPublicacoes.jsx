"use client"

import { useEffect, useState } from "react"
import BarraSuperior from "../componentes/Barra Lateral e Superior/BarraSuperior"
import BarraLateral from "../componentes/Barra Lateral e Superior/BarraLateral"
import BarraPublicacoesEticketsMod from "../componentes/BarraPublicacoesEticketsMod"
import AprovacaoPublicacaoNova from "../componentes/AprovacoesMod/AprovacaoPublicacao"
import "../styles/AprovacoesTicketsePublicacoes.css"

function AprovacoesPublicacoes() {
  const [publicacoes, setPublicacoes] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const paginasModeradas = JSON.parse(sessionStorage.getItem("paginasModeradas") || "[]")

    if (!token || paginasModeradas.length === 0) return

    const buscarPublicacoes = async () => {
      const todasPublicacoes = []

      for (const pagina of paginasModeradas) {
        const idPagina = pagina.id_pagina

        try {
          const res = await fetch(`http://localhost:3000/api/posts/verPostsPendentes/${idPagina}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!res.ok) throw new Error(`HTTP ${res.status}`)

          const posts = await res.json()

          if (Array.isArray(posts)) {
            const transformados = posts.map((p) => ({ ...p, id: p.id_post }))
            todasPublicacoes.push(...transformados)
          }
        } catch (err) {
          console.error(`Erro ao buscar publicações da página ${idPagina}:`, err)
        }
      }

      setPublicacoes(todasPublicacoes)
    }

    buscarPublicacoes()
  }, [token])

  const atualizarPublicacao = (id, bolean) => {
    fetch(`http://localhost:3000/api/posts/atualizarPostsPendentes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bolean }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setPublicacoes((prev) => prev.filter((p) => p.id !== id))
      })
      .catch((err) => {
        console.error("Erro ao atualizar publicação:", err)
      })
  }

  return (
    <div className="container">
      <BarraSuperior />
      <div className="flex">
        <BarraLateral />
        <div className="conteudo">
          <BarraPublicacoesEticketsMod />
          <AprovacaoPublicacaoNova
            publicacoes={publicacoes}
            onAprovar={(id) => atualizarPublicacao(id, true)}
            onRecusar={(id) => atualizarPublicacao(id, false)}
            token={token}
          />
        </div>
      </div>
    </div>
  )
}

export default AprovacoesPublicacoes
