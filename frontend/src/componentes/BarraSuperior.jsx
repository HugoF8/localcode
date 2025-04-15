import Logo from './Logo';
import BarraPesquisa from './BarraPesquisa';
import IconesTopo from './IconesBarraSuperiorDireito';

function Topo() {
  return (
    <div className="topo">
      <Logo />
      <BarraPesquisa />
      <IconesTopo />
    </div>
  );
}

export default Topo;
