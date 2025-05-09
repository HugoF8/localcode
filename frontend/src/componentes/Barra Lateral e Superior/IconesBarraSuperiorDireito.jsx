import React, { useState, useEffect } from 'react';
import ConfiguracoesMenu from './ConfiguracoesMenu';
import NotificacoesDropDown from './NotificacoesDropDown';
import PerfilUtilizador from './PerfilUtilizador';
import ImagemDefaultUtilizador from '../../assets/defautlutilizador.png';

export default function IconesBarraSuperiorDireito() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(ImagemDefaultUtilizador);
  const [fotoCapa, setFotoCapa] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const id_utilizador = Number(localStorage.getItem('id_utilizador'));

    fetch(`http://localhost:3000/api/perfil/verPerfilUtilizador/${id_utilizador}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao obter perfil');
        return res.json();
      })
      .then(perfil => {
        const url = perfil.foto_perfil
          ? (perfil.foto_perfil.startsWith('http')
              ? perfil.foto_perfil
              : `http://localhost:3000/${perfil.foto_perfil}`)
          : ImagemDefaultUtilizador;
        setFotoPerfil(url);

        if (perfil.foto_capa) {
          const capaUrl = perfil.foto_capa
            ? perfil.foto_capa.startsWith('http')
            : `http://localhost:3000/${perfil.foto_capa}`;
          setFotoCapa(capaUrl);
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

      <PerfilUtilizador
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onFotoAtualizada={setFotoPerfil}
        onCapaAtualizada={setFotoCapa}
      />
    </>
  );
}
