import React from 'react';
import { Link } from 'react-router-dom';
import usePaginasSeguidas from '../../utilities/PaginasSeguidas/ProcurarPaginasSeguidas';


export default function BarraLateral() {
  const paginas = usePaginasSeguidas();

  // Filtra para manter apenas uma ocorrência de cada id_pagina
  const unicas = paginas.filter((pagina, idx, arr) =>
    arr.findIndex(p => p.id_pagina === pagina.id_pagina) === idx
  );

  return (
    <div className="barra-lateral">
      <ul>
        {unicas.map((pagina) => {
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
      </ul>
    </div>
  );
}