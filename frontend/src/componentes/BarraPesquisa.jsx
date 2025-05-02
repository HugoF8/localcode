import { useState, useEffect } from 'react';

function BarraPesquisa() {
  const [pesquisa, setPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pesquisa.trim() !== '') {
        const token = localStorage.getItem('token');
  
        fetch(`http://localhost:3000/api/paginaFreguesias/pesquisarPaginas/${pesquisa}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(res => {
            if (!res.ok) throw new Error('Erro na requisição');
            return res.json();
          })
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
        className="input-pesquisa"
      />
      {resultados.length > 0 && (
        <ul className="dropdown-pesquisa">
          {resultados.map((pagina) => (
            <li
              key={pagina.id_pagina}
              onClick={() => handleSelecionar(pagina.id_pagina)}
              className="item-dropdown"
            >
              {pagina.nome_pagina}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default BarraPesquisa;
