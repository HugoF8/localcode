import React, { useState } from 'react';
import '../../styles/AprovacoesTicketsePublicacoes.css';
import BotoesAR from '../genericos/BotoesAprovarRecusar';
import UserProfilePopup from '../PerfilUtilizadorClick';

function AprovacaoPublicacao({ publicacoes, onAprovar, onRecusar }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div className="aprovacoes-container">
      <div className="titulo-centralizado">
        <h2 className="aprovacoes-titulo">Aprovação de Publicações</h2>
      </div>
  
      {publicacoes.map((pub) => (
        <div key={pub.id} className="ticket-card">
          <div className="ticket-header">
            <div className="ticket-user-info" onClick={() => {
              console.log("Cliquei! pub.userId =", pub.id_utilizador);
              setSelectedUserId(pub.id_utilizador);
            }} style={{ cursor: 'pointer' }}>
              <img
                src={
                  pub.utilizador?.perfil?.[0]?.foto_perfil
                    ? `http://localhost:3000/${pub.utilizador.perfil[0].foto_perfil}`
                    : 'http://localhost:3000/uploads/default.jpg'
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'http://localhost:3000/uploads/default.jpg';
                }}
                alt={pub.utilizador?.nome || 'Utilizador'}
                className="ticket-user-img"
              />
              <p className="ticket-user">{pub.utilizador?.nome || 'Utilizador'}</p>
            </div>
  
            <div className="ticket-id">#{pub.id}</div>
          </div>
  
          <p className="ticket-date">
            {new Date(pub.data_post).toLocaleDateString()}
          </p>
  
          <p className="ticket-description">
            {pub.descricao_post || pub.descricao}
          </p>
  
          {pub.media_post && (
            <div className="publicacao-conteudo-central">
              <img
                src={`http://localhost:3000/${pub.media_post}`}
                alt="Imagem da publicação"
                className="publicacao-img"
              />
            </div>
          )}
  
          <div className="flex_spacearound">
            <BotoesAR
              onAprovar={() => onAprovar(pub.id)}
              onRecusar={() => onRecusar(pub.id)}
            />
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
  );}
  
  
export default AprovacaoPublicacao;
