import '../styles/Home.css';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import ZonaPublicacoesHome from '../componentes/publicacoes/ZonaPublicacoesHome';
import PaginasSeguidas from '../componentes/PaginasSeguidas/ProcurarPaginasSeguidas'

function Home() {
  return (
    <div className="container">
      <PaginasSeguidas />
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
        <ZonaPublicacoesHome />
      </div>  
    </div>
  );
}

export default Home;
