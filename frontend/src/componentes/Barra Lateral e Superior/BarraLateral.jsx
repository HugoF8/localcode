// src/components/BarraLateral.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import placeholderPage from '../../assets/placeholder-page.jpg';

export default function BarraLateral() {

  const paginas = JSON.parse(sessionStorage.getItem('paginasSeguidas') || '[]');
  // Filtra duplicadas
  const unicas = paginas.filter((pagina, idx, arr) =>
    arr.findIndex(p => p.id_pagina === pagina.id_pagina) === idx
  );

  return (
    <div className="barra-lateral">
      <ul>
        {unicas.map(pagina => {
          const foto = pagina.foto_perfil
            ? (pagina.foto_perfil.startsWith('http')
                ? pagina.foto_perfil
                : `http://localhost:3000/${pagina.foto_perfil}`)
            : placeholderPage;
          return (
            <li key={pagina.id_pagina}>
              <Link to={`/Pagina/${pagina.id_pagina}`}>  
                <img
                  src={foto}
                  alt={pagina.nome_pagina}
                  title={pagina.nome_pagina}
                  className="icone-pagina"
                  onError={e => {
                    // Se falhar, usa o placeholder importado
                    e.target.onerror = null;
                    e.target.src = placeholderPage;
                  }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
