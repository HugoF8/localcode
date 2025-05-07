// src/components/BarraLateral.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import placeholderPage from '../../assets/placeholder-page.jpg';
import { PaginasSeguidasAtualizacao } from '../../utilities/PaginasSeguidas/PaginasSeguidasAtualizacao';

export default function BarraLateral() {
  const { paginas } = useContext(PaginasSeguidasAtualizacao);

  // Filtra duplicadas
  const unicas = paginas.filter((p, i, arr) => arr.findIndex(x => x.id_pagina === p.id_pagina) === i);

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
                  onError={e => { e.target.onerror = null; e.target.src = placeholderPage; }}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
