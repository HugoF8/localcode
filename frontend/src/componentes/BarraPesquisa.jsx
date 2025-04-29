import { useState, useEffect } from 'react';

function BarraPesquisa() {
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
    <div className="barra-pesquisa">
      <input
        type="text"
        placeholder="Pesquisar páginas..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      {resultados.length > 0 && (
        <ul className="resultados-pesquisa">
          {resultados.map((pagina) => (
            <li key={pagina.id_pagina}>{pagina.nome_pagina}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BarraPesquisa;
