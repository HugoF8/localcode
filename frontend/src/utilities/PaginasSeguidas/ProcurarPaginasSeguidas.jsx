export async function fetchPaginasSeguidas() {
    const token = localStorage.getItem('token');
    const id_utilizador = localStorage.getItem('id_utilizador');
  
    if (!token || !id_utilizador) return;
  
    const res = await fetch(`http://localhost:3000/api/paginasSeguidas/${id_utilizador}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error('Erro ao buscar páginas seguidas');
  
    const data = await res.json();
    if (Array.isArray(data)) {
      sessionStorage.setItem('paginasSeguidas', JSON.stringify(data));
    }
  }