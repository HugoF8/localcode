import React, { useEffect, useState } from 'react';
import '../styles/PerfilUtilizador.css';
import ImagemDefaultUtilizador from '../assets/defautlutilizador.png';
import ImagemDefaultCapa from '../assets/defaultcapautilizador.jpg';
import BotaoModerador from './BotaoModerador';

const UserProfilePopup = ({
  userId,
  onClose,
  paginaAtualId,
  currentUserId,
  idDonoPagina,
  isModeradorNaPagina,
  isPageOwner,
  token
}) => {
  const [perfil, setPerfil] = useState({
    utilizador: { nome: '', email: '', data_nascimento: '' },
    foto_perfil: null,
    foto_capa: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMod, setIsMod] = useState(isModeradorNaPagina);
;

  useEffect(() => {

    
    if (!userId) {
      
      return;
    }
    
    if (!token) {
      console.log('❌ token não fornecido');
      setError('Token de autenticação não encontrado');
      return;
    }

    const carregarPerfil = async () => {

      setLoading(true);
      setError(null);
      
      try {
        const url = `http://localhost:3000/api/perfil/verPerfilUtilizador/${userId}`;
      
        
        const res = await fetch(url, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        
        if (!res.ok) {
          const errorText = await res.text();
          console.log('❌ Erro na resposta:', errorText);
          throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
        }
        
        const p = await res.json();
 
        
        setPerfil({
          utilizador: {
            nome: p.utilizador?.nome || 'Nome não disponível',
            email: p.utilizador?.email || 'Email não disponível',
            data_nascimento: p.utilizador?.data_nascimento || ''
          },
          foto_perfil: p.foto_perfil || null,
          foto_capa: p.foto_capa || null
        });
      } catch (err) {
        setError(`Erro: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    carregarPerfil();
  }, [userId, token]);

  const handleSuccess = () => {
    setIsMod(prev => !prev);
  };

  if (!userId) {

    return null;
  }

  

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="profile-modal-close">✕</button>

        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            borderRadius: '4px', 
            margin: '10px 0' 
          }}>
            {error}
          </div>
        )}

        <div className="profile-modal-cover-wrapper">
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>🔄 Carregando perfil...</p>
            </div>
          ) : (
            <>
              <img
                src={
                  perfil.foto_capa
                    ? (perfil.foto_capa.startsWith('http')
                        ? perfil.foto_capa
                        : `http://localhost:3000/${perfil.foto_capa}`)
                    : ImagemDefaultCapa
                }
                alt="Foto de capa"
                className="profile-modal-cover"
                onError={(e) => {
                  console.log('❌ Erro ao carregar foto de capa');
                  e.target.src = ImagemDefaultCapa;
                }}
              />
              <button className="edit-cover-button" title="Mudar capa">🖉</button>
            </>
          )}
        </div>

        <div className="profile-modal-avatar-wrapper">
          <img
            src={
              perfil.foto_perfil
                ? (perfil.foto_perfil.startsWith('http')
                    ? perfil.foto_perfil
                    : `http://localhost:3000/${perfil.foto_perfil}`)
                : ImagemDefaultUtilizador
            }
            alt="Foto de perfil"
            className="profile-modal-avatar"
            onError={(e) => {
              console.log('❌ Erro ao carregar foto de perfil');
              e.target.src = ImagemDefaultUtilizador;
            }}
          />
        </div>

        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 className="profile-modal-title">
            {loading ? 'Carregando...' : perfil.utilizador.nome}
          </h2>
          
          {!loading && (
            <>
              <p><strong>Email:</strong> {perfil.utilizador.email}</p>
              <p><strong>Data de Nascimento:</strong> {
                perfil.utilizador.data_nascimento 
                  ? new Date(perfil.utilizador.data_nascimento).toLocaleDateString('pt-PT')
                  : 'Não informado'
              }</p>
            </>
          )}
        </div>

        {isPageOwner && Number(userId) !== currentUserId && (
          <div className="botao-moderador-container">
            <BotaoModerador
              isModeradorNaPagina={isMod}
              paginaAtualId={paginaAtualId}
              targetUserId={Number(userId)}
              idDonoPagina={idDonoPagina}
              onSuccess={handleSuccess}
              token={token}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePopup;