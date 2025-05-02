import React, { useEffect, useState } from 'react';
import DropdownPedidos from './DropdownGeral';
import BotoesTicketePublicacoesPedidos from '../BotoesTicketePublicacoes';

function PedidosPendentes() {
  const [pedidos, setPedidos] = useState([]);
  const [aberto, setAberto] = useState(null);

  const togglePedido = (id) => setAberto((prev) => (prev === id ? null : id));

  const fetchPedidos = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/pedidosPagina/verPedidosPendentes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPedidos(data);
  };

  useEffect(() => {
    fetchPedidos();
    const interval = setInterval(fetchPedidos, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const atualizarPedido = async (id, bolean) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/pedidosPagina/atualizarEstadoPedido/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bol: bolean }), // 'bol' é o parâmetro usado no backend
    });

    // Atualiza a lista de pedidos após a aprovação ou recusa
    setPedidos((prev) => prev.filter((p) => p.id_pedido !== id));
  };

  return (
    <DropdownPedidos
      pedidos={pedidos}
      aberto={aberto}
      togglePedido={togglePedido}
      titulo="Pedidos Pendentes"
      exibirBotaoEditar={false}
      acoesAdicionais={(pedido) => (
        <BotoesTicketePublicacoesPedidos
          onAprovar={() => atualizarPedido(pedido.id_pedido, true)} 
          onRecusar={() => atualizarPedido(pedido.id_pedido, false)} 
        />
      )}
    />
  );
}

export default PedidosPendentes;
