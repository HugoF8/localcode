import '../styles/Home.css';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import ZonaPublicacoesHome from '../componentes/ZonaPublicacoesHome';

function Home() {
  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <ZonaPublicacoesHome />
      </div>
    </div>
  );
}

export default Home;
