import '../styles/Home.css';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import BotaoSeguir from '../componentes/PaginaFreguesia/Seguir';


function HomeFreguesia() {
  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
      <BotaoSeguir />

      </div>  
    </div>
  );
}

export default HomeFreguesia;