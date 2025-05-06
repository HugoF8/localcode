import { useEffect, useState } from 'react';

export default function usePaginasSeguidas() {
  const [paginasSeguidas, setPaginasSeguidas] = useState([]);
  const token = localStorage.getItem('token');
  const id_utilizador = localStorage.getItem('id_utilizador');

  useEffect(() => {
    if (!id_utilizador || !token) return;

    fetch(
      `http://localhost:3000/api/seguidores/verPaginasSeguidas/${id_utilizador}`, // ajuste a rota aqui
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPaginasSeguidas(data);
          sessionStorage.setItem('paginasSeguidas', JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar páginas seguidas:', err);
      });
  }, [id_utilizador, token]);

  // 👉 devolve o array para quem usar o hook
  return paginasSeguidas;
}