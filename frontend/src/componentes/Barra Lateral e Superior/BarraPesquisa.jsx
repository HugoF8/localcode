import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export default function BarraPesquisa() {
  const [pesquisa, setPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResultados([]);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce e fetch
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pesquisa.trim()) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:3000/api/paginaFreguesias/pesquisarPaginas/${pesquisa}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            if (!res.ok) throw new Error('Erro na requisição');
            return res.json();
          })
          .then(data => setResultados(data))
          .catch(console.error);
      } else {
        setResultados([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [pesquisa]);

  const irParaPagina = (idPagina) => {
    setPesquisa('');
    setResultados([]);
    navigate(`/Pagina/${idPagina}`);
  };

  return (
    <div className="barra-pesquisa" ref={containerRef}>
      <input
        type="text"
        placeholder="🔍 Pesquisar páginas..."
        value={pesquisa}
        onChange={e => setPesquisa(e.target.value)}
        className="input-pesquisa"
      />

      {resultados.length > 0 && (
        <ul className="dropdown-pesquisa">
          {resultados.map(p => (
            <li
              key={p.id_pagina}
              className="item-dropdown"
              onClick={() => irParaPagina(p.id_pagina)}
            >
              {/* Exemplo de mini-avatar */}
              {p.foto_perfil && (
                <img
                  src={p.foto_perfil.startsWith('http')
                    ? p.foto_perfil
                    : `http://localhost:3000/${p.foto_perfil}`}
                  alt=""
                  className="item-avatar"
                />
              )}
              <span className="item-nome">{p.nome_pagina}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}