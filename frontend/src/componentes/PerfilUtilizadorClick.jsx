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
  isPageOwner
}) => {
  const [perfil, setPerfil] = useState({
    utilizador: { nome: '', email: '', data_nascimento: '' },
    foto_perfil: null,
    foto_capa: null
  });
  const [loading, setLoading] = useState(false);
  const [isMod, setIsMod] = useState(isModeradorNaPagina);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId || !token) return;
    const carregarPerfil = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/perfil/verPerfilUtilizador/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Erro ao obter perfil');
        const p = await res.json();
        setPerfil({
          utilizador: {
            nome: p.utilizador?.nome || '',
            email: p.utilizador?.email || '',
            data_nascimento: p.utilizador?.data_nascimento || ''
          },
          foto_perfil: p.foto_perfil || null,
          foto_capa: p.foto_capa || null
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    carregarPerfil();
  }, [userId, token]);

  const handleSuccess = () => {
    setIsMod(prev => !prev); // Alterna o estado de moderador
  };

  if (!userId) return null;

  return (
    <div className="profile-modal-backdrop">
      <div className="profile-modal-container">
        <button onClick={onClose} className="profile-modal-close">✕</button>

        <div className="profile-modal-cover-wrapper">
          {loading ? (
            <p>Carregando capa...</p>
          ) : (
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
            />
          )}
          <button className="edit-cover-button" title="Mudar capa">🖉</button>
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
          />
        </div>

        <h2 className="profile-modal-title">{perfil.utilizador.nome}</h2>
        <p>{perfil.utilizador.email}</p>
        <p>{new Date(perfil.utilizador.data_nascimento).toLocaleDateString('pt-PT')}</p>

        {isPageOwner && Number(userId) !== currentUserId && (
          <div className="botao-moderador-container">
            <BotaoModerador
              isModeradorNaPagina={isMod}
              paginaAtualId={paginaAtualId}
              targetUserId={Number(userId)}
              idDonoPagina={idDonoPagina}
              onSuccess={handleSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePopup;
