import Logo from './Logo';
import BarraPesquisa from './BarraPesquisa';
import IconesBarraSuperiorDireito from './IconesBarraSuperiorDireito';

function BarraSuperior() {
  return (
    <div className="topo">
      <Logo />
      <BarraPesquisa />
      <IconesBarraSuperiorDireito />
    </div>
  );
}

export default BarraSuperior;
