import React from 'react';
import '../styles/AprovacoesTicketsePublicacoes.css';
import BotoesTicket from './BotoesTicket';
import FotoPerfil from './FotoPerfil';
import speedRoni from '../assets/speedRoni.png';

function AprovacaoPublicacao({ publicacoes, onAprovar, onRecusar }) {
  return (
    <div className="aprovacoes-container">
      <h2 className="aprovacoes-titulo">Aprovação</h2>

      {publicacoes.map((pub) => (
        <div key={pub.id} className="publicacao-card">
          <div className="publicacao-header">
            <div className="publicacao-conteudo">
              <FotoPerfil nome={pub.nome} />

              <p className="publicacao-descricao">{pub.descricao}</p>

              {/* Bloco do conteúdo, com classe comum para controlar o espaçamento */}
              <div className="publicacao-conteudo-central">
                {pub.tipo === 'imagem' && speedRoni && (
                  <img
                    src={speedRoni}
                    alt="Imagem da publicação"
                    className="publicacao-img"
                  />
                )}

                {pub.tipo === 'poll' && (
                  <div className="poll-container">
                    {pub.opcoes.map((opcao) => (
                      <div key={opcao.id} className="poll-opcao">
                        <input
                          type="radio"
                          checked={opcao.selecionada}
                          readOnly
                        />
                        <label>{opcao.texto}</label>
                      </div>
                    ))}
                    <p className="poll-data">Termina em: {pub.dataTermino}</p>
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="publicacao-botoes">
                <BotoesTicket
                  onAprovar={() => onAprovar(pub.id)}
                  onRecusar={() => onRecusar(pub.id)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AprovacaoPublicacao;