import '../App.css';
import '../styles/PedidoPagina.css'
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import DropdownPedidos from '../componentes/Pedidos/PedidosDropdown';

function verPedidos() {
    return (
        <div className="container">
          <BarraSuperior />
          <BarraLateral />
          <div className="corpo">
            <DropdownPedidos />
          </div>
        </div>
      );
}
  
  export default verPedidos;