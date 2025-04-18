import blackImage from '../assets/black.jpg';
import ConfiguracoesMenu from './ConfiguracoesMenu';
import NotificacoesDropDown from './NotificacoesDropDown';

function IconesBarraSuperiorDireito() {
  return (
    <div className="icones-topo">
      <img className="utilizador-img" src={blackImage} alt="User" />
      <NotificacoesDropDown  /*id_utilizador={id_utilizador}*//>
      <ConfiguracoesMenu />
    </div>
  );
}
  
  export default IconesBarraSuperiorDireito;
  