import { useState } from "react"
import { useParams } from "react-router-dom"

function BotaoSeguir() {
  const { id } = useParams()
  const [seguindo, setSeguindo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mensagem, setMensagem] = useState(null)

  const seguirPagina = async () => {
    setLoading(true)
    setError(null)
    setMensagem(null)

    try {
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:3000/api/seguidores/criarSeguidor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_pagina: Number(id),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao seguir página")
      }

      setSeguindo(true)
      setMensagem("Agora você está a seguir esta página!")
      setTimeout(() => setMensagem(null), 3000)
    } catch (error) {
      console.error("Erro ao seguir página:", error)

      if (error.message.includes("Unique constraint failed")) {
        setSeguindo(true)
        setMensagem("Você já está seguindo esta página")
      } else {
        setError(error.message || "Ocorreu um erro ao tentar seguir esta página")
      }

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
        className={`botao-seguir ${seguindo ? "A seguir" : ""} ${loading ? "loading" : ""}`}
        onClick={seguirPagina}
        disabled={loading}
      >
        {loading ? (
          "A seguir..."
        ) : seguindo ? (
          <>
            <span className="icon-check">✓</span> A Seguir
          </>
        ) : (
          <>
            <span className="icon-plus">+</span> Seguir Página
          </>
        )}
      </button>
    </div>
  )
}

export default BotaoSeguir
