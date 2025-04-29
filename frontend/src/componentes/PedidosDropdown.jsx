/*import React, { useEffect, useState } from 'react'
import '../styles/PedidoPagina.css';  

function DropdownPedidos({ idUtilizador }) {
  const [pedidos, setPedidos] = useState([])
  const [aberto, setAberto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPedidos() {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3000/verPedidosRecusados`)
        const data = await response.json()
        setPedidos(data)
        setError(null)
      } catch (error) {
        console.error('Erro ao procurar pedidos:', error)
        setError('Falha ao carregar pedidos. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchPedidos()
  }, [])

  const togglePedido = (id) => {
    setAberto((anterior) => (anterior === id ? null : id))
  }

  if (loading) return <p className="loading-message">Carregando pedidos...</p>
  if (error) return <p className="error-message">{error}</p>

  return (
    <div className="pedido-list-wrapper">
      <h1 className="pedido-title">Pedidos Recusados</h1>

      {pedidos.length === 0 ? (
        <p className="no-pedidos">Nenhum pedido recusado encontrado.</p>
      ) : (
        pedidos.map((pedido) => (
          <article
            key={pedido.id_pedido}
            className={`pedido-card ${aberto === pedido.id_pedido ? 'expanded' : ''}`}
          >
            <div className="pedido-header">
              <div>
                <p className="pedido-freguesia">{pedido.nomefreguesia}</p>
                <p className="pedido-date">
                  {pedido.data_pedido ? 
                    new Date(pedido.data_pedido).toLocaleDateString() : 
                    'Data não disponível'}
                </p>
              </div>
              <div className="pedido-id">#{pedido.id_pedido}</div>
              <button 
                className="pedido-toggle" 
                onClick={() => togglePedido(pedido.id_pedido)}
                aria-expanded={aberto === pedido.id_pedido}
              >
                {aberto === pedido.id_pedido ? '˄' : '˅'}
              </button>
            </div>

            {aberto === pedido.id_pedido && (
              <section className="pedido-details">
                <p className="pedido-info"><strong>Nome Freguesia:</strong> {pedido.nomefreguesia}</p>
                <p className="pedido-info">
                  <strong>Morada:</strong>{' '}
                  {pedido.morada ? (
                    <>
                      {pedido.morada.rua && `${pedido.morada.rua}, `}
                      {pedido.morada.freguesia && `${pedido.morada.freguesia}, `}
                      {pedido.morada.cidade ?? 'N/A'}
                    </>
                  ) : 'Morada não disponível'}
                </p>
                <div className="pedido-comprovativo">
                  <p><strong>Comprovativo:</strong></p>
                  <a
                    href={`/ficheiros/${pedido.dados_comprovacao}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-comprovativo"
                  >
                    Ver Anexo 📎
                  </a>
                </div>
              </section>
            )}
          </article>
        ))
      )}
    </div>
  )
}

export default DropdownPedidos*/


// mockPedidos.js
export const mockPedidos = [
    {
      id_pedido: 1001,
      nomefreguesia: "Freguesia de São Vicente",
      data_pedido: "2023-11-15T14:30:00Z",
      morada: {
        rua: "Rua das Flores, 123",
        freguesia: "São Vicente",
        cidade: "Lisboa"
      },
      dados_comprovacao: "comprovativo_1001.pdf",
      estado: "recusado",
      motivo_recusa: "Documentação incompleta"
    },
    {
      id_pedido: 1002,
      nomefreguesia: "Freguesia de Benfica",
      data_pedido: "2023-10-22T09:15:00Z",
      morada: {
        rua: "Avenida da República, 45",
        freguesia: "Benfica",
        cidade: "Lisboa"
      },
      dados_comprovacao: "comprovativo_1002.pdf",
      estado: "recusado",
      motivo_recusa: "Informações incorretas"
    },
    {
      id_pedido: 1003,
      nomefreguesia: "Freguesia de Arroios",
      data_pedido: "2023-12-05T16:45:00Z",
      morada: {
        rua: "Rua Nova do Almada, 78",
        freguesia: "Arroios",
        cidade: "Lisboa"
      },
      dados_comprovacao: "comprovativo_1003.pdf",
      estado: "recusado",
      motivo_recusa: "Fora do prazo"
    },
    {
      id_pedido: 1004,
      nomefreguesia: "Freguesia de Alcântara",
      data_pedido: "2023-11-30T11:20:00Z",
      morada: {
        rua: "Rua da Junqueira, 15",
        freguesia: "Alcântara",
        cidade: "Lisboa"
      },
      dados_comprovacao: "comprovativo_1004.pdf",
      estado: "recusado",
      motivo_recusa: "Não cumpre requisitos"
    },
    {
      id_pedido: 1005,
      nomefreguesia: "Freguesia de Carnide",
      data_pedido: "2023-09-18T10:00:00Z",
      morada: null, // Testando caso sem morada
      dados_comprovacao: "comprovativo_1005.pdf",
      estado: "recusado",
      motivo_recusa: "Documentação ilegível"
    }
  ];

  import React, { useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'; // Importe o hook de navegação
  import '../styles/PedidoPagina.css';  
  
  function DropdownPedidos({ idUtilizador }) {
    const [pedidos, setPedidos] = useState([])
    const [aberto, setAberto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate(); // Hook para navegação
  
    useEffect(() => {
      const fetchPedidos = async () => {
        setLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setPedidos(mockPedidos);
          setError(null);
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
      <div className="main-content">
        <div className="pedido-list-wrapper">
          <h1 className="pedido-title">Pedidos Recusados</h1>
  
          {pedidos.length === 0 ? (
            <p className="no-pedidos">Nenhum pedido recusado encontrado.</p>
          ) : (
            pedidos.map((pedido) => (
              <article
                key={pedido.id_pedido}
                className={`pedido-card ${aberto === pedido.id_pedido ? 'expanded' : ''}`}
              >
                <div className="pedido-header">
                  <div>
                    <p className="pedido-freguesia">{pedido.nomefreguesia}</p>
                    <p className="pedido-date">
                      {pedido.data_pedido ? 
                        new Date(pedido.data_pedido).toLocaleDateString() : 
                        'Data não disponível'}
                    </p>
                  </div>
                  <div className="pedido-id">#{pedido.id_pedido}</div>
                  <button 
                    className="pedido-toggle" 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePedido(pedido.id_pedido);
                    }}
                    aria-expanded={aberto === pedido.id_pedido}
                  >
                    {aberto === pedido.id_pedido ? '˄' : '˅'}
                  </button>
                </div>
  
                {aberto === pedido.id_pedido && (
                  <section className="pedido-details">
                    <p className="pedido-info"><strong>Nome Freguesia:</strong> {pedido.nomefreguesia}</p>
                    <p className="pedido-info">
                      <strong>Morada:</strong>{' '}
                      {pedido.morada ? (
                        <>
                          {pedido.morada.rua && `${pedido.morada.rua}, `}
                          {pedido.morada.freguesia && `${pedido.morada.freguesia}, `}
                          {pedido.morada.cidade ?? 'N/A'}
                        </>
                      ) : 'Morada não disponível'}
                    </p>
                    <p className="pedido-info"><strong>Motivo da Recusa:</strong> {pedido.motivo_recusa}</p>
                    <div className="pedido-comprovativo">
                      <p><strong>Comprovativo:</strong></p>
                      <a
                        href={`#${pedido.dados_comprovacao}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-comprovativo"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Visualizando comprovativo: ${pedido.dados_comprovacao}`);
                        }}
                      >
                        Ver Anexo 📎
                      </a>
                    </div>
                    
                    {/* Botão de Editar */}
                    <div className="pedido-actions">
                      <button 
                        className="btn-"
                        onClick={() => navegarParaEditar(pedido)}
                      >
                        Editar Pedido
                      </button>
                    </div>
                  </section>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    )
  }
  
  export default DropdownPedidos