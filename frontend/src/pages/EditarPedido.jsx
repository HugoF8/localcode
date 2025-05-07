import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
import '../styles/CriarFreguesia.css';
import EditarPedidoC from '../componentes/Pedidos/EditarPedido';


function editarPedido() {
  return (
    <div className="container">
      <BarraSuperior />
      <BarraLateral />
      <div className="corpo">
        <EditarPedidoC/>
      </div>
    </div>
  );
}


export default editarPedido;








