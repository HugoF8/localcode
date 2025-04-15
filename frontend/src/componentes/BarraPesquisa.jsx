import { useState, useEffect } from 'react';

function SearchBar() {
  const [pesquisa, setPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pesquisa.trim() !== '') {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/pesquisarPaginas?pesquisa=${pesquisa}`)
          .then(res => res.json())
          .then(data => setResultados(data))
          .catch(err => console.error('Erro:', err));
      } else {
        setResultados([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [pesquisa]);

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar páginas..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <ul>
        {resultados.map((pagina) => (
          <li key={pagina.id_pagina}>{pagina.nome_pagina}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
