import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import '../../styles/Home.css'

function BotaoSeguir() {
  const { id } = useParams()
  const [seguindo, setSeguindo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mensagem, setMensagem] = useState(null)

  const token = localStorage.getItem("token")
  const id_utilizador = localStorage.getItem("id_utilizador")

  // Ao montar, verifica se já seguimos esta página
  useEffect(() => {
    if (!token || !id_utilizador) return

    fetch(`http://localhost:3000/api/seguidores/verPaginasSeguidas/${id_utilizador}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        const jaSegue = data.some(p => p.id_pagina === Number(id))
        setSeguindo(jaSegue)
      })
      .catch(err => {
        console.error("Erro ao verificar seguimento:", err)
      })
  }, [id, token, id_utilizador])

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    setMensagem(null)

    try {
      if (!seguindo) {
        // Seguir
        const response = await fetch(
          "http://localhost:3000/api/seguidores/criarSeguidor",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id_pagina: Number(id) }),
          }
        )
        if (!response.ok) {
          const errData = await response.json()
          throw new Error(errData.error || "Erro ao seguir página")
        }
      } else {
        // Deixar de seguir
        const response = await fetch(
          "http://localhost:3000/api/seguidores/removerSeguidor",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id_utilizador: Number(id_utilizador),
              id_pagina: Number(id),
            }),
          }
        )
        if (!response.ok) {
          const errData = await response.json()
          throw new Error(errData.error || "Erro ao deixar de seguir página")
        }
      }

      // Atualiza o estado e o sessionStorage
      setSeguindo(prev => !prev)
      const resPaginas = await fetch(
        `http://localhost:3000/api/seguidores/verPaginasSeguidas/${id_utilizador}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const paginas = await resPaginas.json()
      sessionStorage.setItem("paginasSeguidas", JSON.stringify(paginas))

      setTimeout(() => setMensagem(null), 3000)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setTimeout(() => setError(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {mensagem && <div className="success-message">{mensagem}</div>}

      <button
        className={`botao-seguir ${seguindo ? "A-seguir" : ""} ${
          loading ? "loading" : ""
        }`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading
          ? seguindo
            ? "A deixar de seguir..."
            : "A seguir..."
          : seguindo
          ? (
            <>
              <span className="icon-check">✓</span> A Seguir
            </>
          )
          : (
            <>
              <span className="icon-plus">+</span> Seguir Página
            </>
          )}
      </button>
    </div>
  )
}

export default BotaoSeguir