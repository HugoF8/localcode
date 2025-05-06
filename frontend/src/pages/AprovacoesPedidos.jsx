import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
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
