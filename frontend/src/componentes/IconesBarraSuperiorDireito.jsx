// src/componentes/IconesBarraSuperiorDireito.jsx
import React, { useState, useEffect } from 'react';
import ConfiguracoesMenu from './ConfiguracoesMenu';
import NotificacoesDropDown from './NotificacoesDropDown';
import ProfileModal from './PerfilUtilizador';
import ImagemDefaultUtilizador from '../assets/defautlutilizador.png';

export default function IconesBarraSuperiorDireito() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(ImagemDefaultUtilizador);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/api/perfil/verPerfil', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao obter perfil');
        return res.json();
      })
      .then(data => {
        const p = data[0];
        // Se existir foto_perfil válida, usa-a; caso contrário, mantém o default
        if (p && p.foto_perfil) {
          const url = p.foto_perfil.startsWith('http')
            ? p.foto_perfil
            : `http://localhost:3000/${p.foto_perfil}`;
          setFotoPerfil(url);
        }
      })
      .catch(console.error);
  }, [token]);

  return (
    <>
      <div className="icones-topo">
        <img
          className="utilizador-img"
          src={fotoPerfil}
          alt="Avatar do utilizador"
          onClick={() => setModalOpen(true)}
          style={{ cursor: 'pointer' }}
        />
        <NotificacoesDropDown />
        <ConfiguracoesMenu />
      </div>

      <ProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onFotoAtualizada={setFotoPerfil}
      />
    </>
  );
}
