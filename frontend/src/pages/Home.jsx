import Topo from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import ZonaPublicacoes from '../componentes/ZonaPublicacoesHome';

function Home() {
  return (
    <div className="container">
      <Topo />
      <div className="corpo">
        <BarraLateral />
        <ZonaPublicacoes />
      </div>
    </div>
  );
}

export default Home;
