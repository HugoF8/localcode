
  import React, { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
  import '../../styles/PedidoPagina.css';  
  import DropdownPedidos from './DropdownGeral'
  
  function DropdownReprovados({ idUtilizador }) {
    const [pedidos, setPedidos] = useState([])
    const [aberto, setAberto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate(); // Hook para navegação
  
    useEffect(() => {
      const fetchPedidos = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');

          const response = await fetch(`http://localhost:3000/api/pedidosPagina/PedidosReprovados`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
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
      setAberto((anterior) => (anterior === id ? null : id))
    }
  
    // Função para navegar para a página de edição
    const navegarParaEditar = (pedido) => {
      // Armazenar os dados do pedido no localStorage para acessá-los na página de edição
      localStorage.setItem('pedidoParaEditar', JSON.stringify(pedido));
      // Navegar para a página de edição
      navigate(`/editar-pedido/${pedido.id_pedido}`);
    };
  
    if (loading) return <p className="loading-message">Carregando pedidos...</p>
    if (error) return <p className="error-message">{error}</p>
  
    return (
      <DropdownPedidos
      pedidos={pedidos}
      aberto={aberto}
      togglePedido={togglePedido}
      navegarParaEditar={navegarParaEditar}
      titulo="Pedidos Recusados"
      exibirBotaoEditar={true} 
    />
    )
  }
  
  export default DropdownReprovados