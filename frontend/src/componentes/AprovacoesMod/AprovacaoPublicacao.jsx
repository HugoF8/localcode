import React, { useState } from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import FotoPerfil from './FotoPerfil';
import placeholder from '../../assets/landscape-placeholder.svg';
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


            <button
              onClick={() => { console.log("Cliquei! pub.userId =", pub.id_utilizador); setSelectedUserId(pub.id_utilizador)}}
              className="cursor-pointer w-fit border-none bg-transparent p-0"
              style={{ all: 'unset', cursor: 'pointer' }}//tirar
            >
              <FotoPerfil nome={pub.nome} />
            </button>


              <p className="publicacao-descricao">
                {pub.descricao_post || pub.descricao}
              </p>

              <div className="publicacao-conteudo-central">
                <img
                  src={
                    pub.media_post
                      ? `http://localhost:3000/${pub.media_post}`
                      : placeholder
                  }
                  alt="Imagem da publicação"
                  className="publicacao-img"
                />
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