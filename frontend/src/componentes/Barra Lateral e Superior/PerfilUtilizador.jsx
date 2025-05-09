import React, { useEffect, useState, useRef } from 'react';
import '../../styles/PerfilUtilizador.css';
import ImagemDefaultUtilizador from '../../assets/defautlutilizador.png';
import ImagemDefaultCapa from '../../assets/defaultcapautilizador.jpg';

export default function PerfilUtilizador({ isOpen, onClose, onFotoAtualizada, onCapaAtualizada }) {
  const [perfil, setPerfil] = useState({
    utilizador: { nome: '', email: '', data_nascimento: '' },
    foto_perfil: null,
    foto_capa: null
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const fileInputCapaRef = useRef();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isOpen || !token) return;

    const carregarPerfil = async () => {
      setLoading(true);
      const id_utilizador = Number(localStorage.getItem('id_utilizador'));
      try {
        const res = await fetch(`http://localhost:3000/api/perfil/verPerfilUtilizador/${id_utilizador}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
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
  }, [isOpen, token]);

  const handleCapaChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('imagem', file);

  fetch('http://localhost:3000/api/perfil/foto-capa', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error('Falha no upload da capa');
      return res.json();
    })
    .then(updated => {
      const url = updated.foto_capa.startsWith('http')
        ? updated.foto_capa
        : `http://localhost:3000/${updated.foto_capa}`;
      setPerfil(prev => ({ ...prev, foto_capa: url }));
      onCapaAtualizada(url);
    })
    .catch(console.error);
};

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
        setPerfil(prev => ({ ...prev, foto_perfil: updated.foto_perfil }));
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
          <button
            type="button"
            onClick={() => fileInputCapaRef.current.click()}
            className="profile-modal-cover-edit-btn"
            title="Mudar capa"
          >
            🖉
          </button>
          <input
            ref={fileInputCapaRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleCapaChange}
          />
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
        <p>{perfil.utilizador.email}</p>
        <p>{new Date(perfil.utilizador.data_nascimento).toLocaleDateString('pt-PT')}</p>
      </div>
    </div>
  );
}
