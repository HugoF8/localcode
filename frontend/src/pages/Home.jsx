import '../styles/Home.css';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import ZonaPublicacoesHome from '../componentes/publicacoes/ZonaPublicacoesHome';

function Home() {
  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
        <ZonaPublicacoesHome />
      </div>  
    </div>
  );
}

export default Home;
