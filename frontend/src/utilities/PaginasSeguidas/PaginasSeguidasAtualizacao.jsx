import React, { createContext, useState, useEffect } from 'react';

export const FollowedPagesContext = createContext({
  paginas: [],
  reload: () => {}
});

export function FollowedPagesProvider({ children }) {
  const [paginas, setPaginas] = useState([]);

  const reload = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/seguidoresPagina/meusSeguidos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Falha ao carregar seguidos');
      const data = await res.json();
      setPaginas(data);
      // opcional: guardar num storage para uso offline:
      sessionStorage.setItem('paginasSeguidas', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <FollowedPagesContext.Provider value={{ paginas, reload }}>
      {children}
    </FollowedPagesContext.Provider>
  );
}