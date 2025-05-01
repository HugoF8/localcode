import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PedidoPagina.css';
import DropdownPedidos from './DropdownGeral';

function DropdownPendentes({ idUtilizador }) {
  const [pedidos, setPedidos] = useState([]);
  const [aberto, setAberto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Buscar os pedidos pendentes
  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/pedidosPagina/verPedidosPendentes`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const resultado = await response.json();
        setPedidos(resultado);
      } catch (error) {
        console.error('Erro ao procurar pedidos:', error);
        setError('Falha ao carregar pedidos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  const togglePedido = (id) => {
    setAberto((anterior) => (anterior === id ? null : id));
  };

  const navegarParaEditar = (pedido) => {
    localStorage.setItem('pedidoParaEditar', JSON.stringify(pedido));
    navigate(`/editar-pedido/${pedido.id_pedido}`);
  };

  if (loading) return <p className="loading-message">Carregando pedidos...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <DropdownPedidos
      pedidos={pedidos}
      aberto={aberto}
      togglePedido={togglePedido}
      navegarParaEditar={navegarParaEditar}
      titulo="Pedidos Pendentes"
      exibirBotaoEditar={false} 
    />
    
  );
}

export default DropdownPendentes;
