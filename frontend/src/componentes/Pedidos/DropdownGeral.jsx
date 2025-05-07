import React from 'react';
import BotaoEditarPedido from './BotaoEditarPedido';
import '../../styles/PedidoPagina.css';

function DropdownPedidos({
  pedidos,
  aberto,
  togglePedido,
  navegarParaEditar,
  titulo = "Pedidos",
  exibirBotaoEditar = true,
  acoesAdicionais = null
}) {
  if (!pedidos || pedidos.length === 0) {
    return <p className="no-pedidos">Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="main-content">
      <div className="pedido-list-wrapper">
        <h1 className="pedido-title">{titulo}</h1>

        {pedidos.map((pedido) => (
          <article
            key={pedido.id_pedido}
            className={`pedido-card ${aberto === pedido.id_pedido ? 'expanded' : ''}`}
          >
            <div className="pedido-header">
              <div>
                <p className="pedido-freguesia">{pedido.nomefreguesia}</p>
                <p className="pedido-date">
                  {pedido.data_pedido
                    ? new Date(pedido.data_pedido).toLocaleDateString()
                    : 'Data não disponível'}
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

                {pedido.dados_comprovacao && (
                  <div className="pedido-comprovativo">
                  <p><strong>Comprovativo:</strong></p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {(() => {
                      const nomeFicheiro = pedido.dados_comprovacao.split('\\').pop().split('/').pop();
                      const url = `http://localhost:3000/uploads/${nomeFicheiro}`;
                      return (
                        <>
                          <a
                            href={url}
                            download
                            className="btn-comprovativo"
                          >
                            📥 Download
                          </a>
                        </>
                      );
                    })()}
                  </div>
                </div>
                )}

                {/* Botão de editar (condicional) */}
                {exibirBotaoEditar && navegarParaEditar && (
                  <BotaoEditarPedido pedido={pedido} navegarParaEditar={navegarParaEditar} />
                )}

                {/* Ações adicionais, se fornecidas */}
                {acoesAdicionais && (
                  <div className="pedido-acoes-extra">
                    {acoesAdicionais(pedido)}
                  </div>
                )}
              </section>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default DropdownPedidos;
