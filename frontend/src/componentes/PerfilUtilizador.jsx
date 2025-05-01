import React, { useEffect, useState, useRef } from 'react';
import '../styles/PerfilUtilizador.css';
import ImagemDefaultUtilizador from '../assets/defautlutilizador.png';
import ImagemDefaultCapa from '../assets/defaultcapautilizador.jpg';

export default function PerfilUtilizador({ isOpen, onClose, onFotoAtualizada }) {
  const storedUser = JSON.parse(localStorage.getItem('utilizador') || '{}');
  const [perfil, setPerfil] = useState({
    utilizador: {
      nome: storedUser.name || '',
      email: storedUser.email || '',
      data_nascimento: storedUser.data_nascimento || ''
    },
    foto_perfil: null,
    foto_capa: null
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isOpen || !token) return;

    setLoading(true);
    fetch('http://localhost:3000/api/perfil/verPerfil', {
        method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao obter perfil');
        return res.json();
      })
      .then(data => {
        const p = data[0] || {};
        setPerfil(prev => ({
          utilizador: {
            nome: p.utilizador?.nome || prev.utilizador.nome,
            email: p.utilizador?.email || prev.utilizador.email,
            data_nascimento: p.utilizador?.data_nascimento || prev.utilizador.data_nascimento
          },
          foto_perfil: p.foto_perfil || null,
          foto_capa: p.foto_capa || null
        }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen, token]);

  const handleFotoChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('imagem', file);

    fetch('http://localhost:3000/api/perfil/foto-perfil', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error('Falha no upload da foto');
        return res.json();
      })
      .then(updated => {
        const url = updated.foto_perfil.startsWith('http')
          ? updated.foto_perfil
          : `http://localhost:3000/${updated.foto_perfil}`;
        setPerfil(prev => ({ ...prev, foto_perfil: url }));
        onFotoAtualizada(url);
      })
      .catch(console.error);
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-backdrop">
      <div className="profile-modal-container">
        <button onClick={onClose} className="profile-modal-close">✕</button>

        {/* Foto de capa */}
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
        </div>

        {/* Foto de perfil e edição */}
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
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="profile-modal-avatar-edit-btn"
            title="Mudar foto"
          >
            🖉
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFotoChange}
          />
        </div>

        {/* Dados do utilizador */}
        <h2 className="profile-modal-title">{perfil.utilizador.nome}</h2>
        <div className="profile-modal-info">
          <div><strong>Contacto:</strong> {perfil.utilizador.contacto || '—'}</div>
          <div><strong>Email:</strong> {perfil.utilizador.email}</div>
          <div>
            <strong>Data de Nasc.:</strong>{' '}
            {new Date(perfil.utilizador.data_nascimento).toLocaleDateString('pt-PT')}
          </div>
        </div>
      </div>
    </div>
  );
}
