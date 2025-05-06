export default async function fetchPaginasModeradas() {
    const token = localStorage.getItem('token');
  
    if (!token) return;
  
    const res = await fetch(`http://localhost:3000/api/moderadores/verPaginasModeradas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error('Erro ao buscar páginas Moderadas');
  
    const data = await res.json();
    if (Array.isArray(data)) {
      sessionStorage.setItem('paginasModeradas', JSON.stringify(data));
    }
  }
