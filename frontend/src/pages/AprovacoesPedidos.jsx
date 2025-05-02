import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import DropdownPendentes from  '../componentes/Pedidos/PedidosPendentes'


function aprovacoesPedidos() {
  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
      <DropdownPendentes />
      </div>
    </div>
  );
}


export default aprovacoesPedidos;
