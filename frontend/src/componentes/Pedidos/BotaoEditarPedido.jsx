import React from 'react'
import '../../styles/PedidoPagina.css'; 

function BotaoEditarPedido({ pedido, navegarParaEditar }) {
  if (!pedido || !navegarParaEditar) return null

  return (
    <div className="pedido-actions">
      <button
        className="btn-enviar"
        onClick={() => navegarParaEditar(pedido)}
      >
        Editar Pedido
      </button>
    </div>
  )
}

export default BotaoEditarPedido