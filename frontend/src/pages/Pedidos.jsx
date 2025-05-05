import '../App.css';
import '../styles/PedidoPagina.css'
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import DropdownReprovados from '../componentes/Pedidos/PedidosReprovados';
import DropdownAprovados from '../componentes/Pedidos/PedidosAprovados';

function Pedidos() {
    return (
        <div className="container">
          <BarraSuperior />
          <BarraLateral />
          <div className="corpo">
            <DropdownReprovados />
            <DropdownAprovados/>
          </div>
        </div>
      );
}
  
  export default Pedidos;