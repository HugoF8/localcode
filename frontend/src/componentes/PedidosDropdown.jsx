import React, { useEffect, useState } from 'react'
import '../styles/PedidoPagina.css'

function DropdownPedidos({ idUtilizador }) {
  const [pedidos, setPedidos] = useState([])
  const [aberto, setAberto] = useState(null)
//----------------------
  const isMock = true // <- muda para false quando ligares ao backend

  useEffect(() => {
    async function fetchPedidos() {
      if (isMock) {
        // MOCK para testes locais
        setPedidos([
          {
            id_pedido: 1,
            id_utilizador: 1,
            nomefreguesia: 'São Pedro',
            data_pedido: '2023-10-01',
            dados_comprovacao: 'ficheiro.pdf',
            morada: {
              rua: 'Rua Central',
              freguesia: 'São Pedro',
              cidade: 'Braga'
            }
          }
        ])
      } else {
        //----------------------
        try {
          const response = await fetch(`http://localhost:3000/verPedidosRecusados`)
          const data = await response.json()
          setPedidos(data)
        } catch (error) {
          console.error('Erro ao procurar pedidos:', error)
        }
      }
    }

    fetchPedidos()
  }, [idUtilizador])

  const togglePedido = (id) => {
    setAberto((anterior) => (anterior === id ? null : id))
  }

  return (
    <div>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.id_pedido}
            className="pedido"
            onClick={() => togglePedido(pedido.id_pedido)}
          >
            <div className="pedido-header">
              <strong>{pedido.nomefreguesia}</strong> —{' '}
              {new Date(pedido.data_pedido).toLocaleDateString()}
            </div>

            {aberto === pedido.id_pedido && (
              <div className="pedido-details">
                <p>
                  <strong>Nome Freguesia:</strong> {pedido.nomefreguesia}
                </p>
                <p>
                  <strong>Morada:</strong>{' '}
                  {pedido.morada?.rua && `${pedido.morada.rua}, `}
                  {pedido.morada?.freguesia && `${pedido.morada.freguesia}, `}
                  {pedido.morada?.cidade ?? 'N/A'}
                </p>
                <p><strong>Comprovativo:</strong></p>
                <a
                  href={`/ficheiros/${pedido.dados_comprovacao}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pedido-link"
                >
                  Ver Anexo 📎
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default DropdownPedidos
