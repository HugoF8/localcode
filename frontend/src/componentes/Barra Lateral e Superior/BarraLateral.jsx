// src/componentes/BarraLateral.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import usePaginasSeguidas from '../../utilities/PaginasSeguidas/ProcurarPaginasSeguidas';

export default function BarraLateral() {
  const paginas = usePaginasSeguidas();

  return (
    <div className="barra-lateral">
      <ul>
        {paginas.map((pagina) => {
          const foto = pagina.foto_perfil
            ? (pagina.foto_perfil.startsWith('http')
                ? pagina.foto_perfil
                : `http://localhost:3000/${pagina.foto_perfil}`)
            : '/placeholder-page.png';
          return (
            <li key={pagina.id_pagina}>
              <Link to={`/Pagina/${pagina.id_pagina}`}>
                <img
                  src={foto}
                  alt={pagina.nome_pagina}
                  title={pagina.nome_pagina}
                  className="icone-pagina"
                />
              </Link>
            </li>
          );
        })}
        {/* Se não houver páginas, o map devolve [] e o <ul> fica vazio */}
      </ul>
    </div>
  );
}