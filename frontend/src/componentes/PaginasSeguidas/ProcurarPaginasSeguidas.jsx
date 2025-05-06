import { useEffect, useState } from 'react';

function usePaginasSeguidas() {
  const [paginasSeguidas, setPaginasSeguidas] = useState([]);
  const token = localStorage.getItem('token');
  const id_utilizador = localStorage.getItem('id_utilizador');

  useEffect(() => {
    if (!id_utilizador || !token) return;

    fetch(`http://localhost:3000/api/verPaginasSeguidas/${id_utilizador}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPaginasSeguidas(data);
          //guardar em sessionStorage:
          sessionStorage.setItem('paginasSeguidas', JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar páginas seguidas:', err);
      });
  }, [id_utilizador, token]);

  return null;
}

export default usePaginasSeguidas;
