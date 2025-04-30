import React from 'react';
import '../styles/AprovacoesTicketsePublicacoes.css';
import BotoesTicket from './BotoesTicket';
import FotoPerfil from './FotoPerfil';

function AprovacaoPublicacao({ publicacoes, onAprovar, onRecusar }) {
    return (
      <div className="aprovacoes-container">
        <h2 className="titulo-aprovacoes">Aprovação</h2>
  
        {publicacoes.map((pub) => (
          <div key={pub.id} className="publicacao-card">
            <div className="publicacao-cabecalho">
              <h3 className="publicacao-nome">{pub.nome}</h3>
              <p className="publicacao-descricao">{pub.descricao}</p>
            </div>
            <div className="imagem perfil">
            <FotoPerfil nome={pub.nome} />
            </div>
  
            {pub.tipo === 'imagem' && pub.imagemPublicacao && (
              <img
                src={pub.imagemPublicacao}
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
  
            <BotoesTicket
              onAprovar={() => onAprovar(pub.id)}
              onRecusar={() => onRecusar(pub.id)}
            />
          </div>
        ))}
      </div>
    );
  }
  
  export default AprovacaoPublicacao;