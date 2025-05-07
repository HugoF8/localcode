import React, { useState } from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import FotoPerfil from './FotoPerfil';
import ex from '../../assets/landscape-placeholder.svg';
import BotoesTicketePublicacoesPedidos from './BotoesTicketePublicacoes';
import UserProfilePopup from '../PerfilUtilizadorClick';

function AprovacaoPublicacao({ publicacoes, onAprovar, onRecusar }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className="aprovacoes-container">
    <div className="titulo-centralizado">
      <h2 className="aprovacoes-titulo">Aprovação de Publicações</h2>
    </div>

      {publicacoes.map((pub) => (
        <div key={pub.id} className="publicacao-card">
          <div className="publicacao-header">
            <div className="publicacao-conteudo">

            <div onClick={() => setSelectedUserId(pub.userId)} className="cursor-pointer w-fit">
                <FotoPerfil nome={pub.nome} /> 
                console.log(userId)
              </div>

              <p className="publicacao-descricao">{pub.descricao_post || pub.descricao}</p>

              <div className="publicacao-conteudo-central">
                {pub.tipo === 'imagem' && (
                  <img
                    src={ex}
                    alt="Imagem da publicação"
                    className="publicacao-img"
                  />
                )}

                {pub.tipo === 'poll' && (
                  <div className="poll-container">
                    {pub.opcoes.map((opcao) => (
                      <div key={opcao.id} className="poll-opcao">
                        <input type="radio" checked={opcao.selecionada} readOnly />
                        <label>{opcao.texto}</label>
                      </div>
                    ))}
                    <p className="poll-data">Termina em: {pub.dataTermino}</p>
                  </div>
                )}
              </div>

              <div className="publicacao-botoes">
                <BotoesTicketePublicacoesPedidos
                  onAprovar={() => onAprovar(pub.id)}
                  onRecusar={() => onRecusar(pub.id)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedUserId && (
        <UserProfilePopup
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}

export default AprovacaoPublicacao;