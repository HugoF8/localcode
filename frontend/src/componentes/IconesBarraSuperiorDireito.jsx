import blackImage from '../assets/black.jpg';
import notificationIcon from '../assets/notification-icon.png';
import ConfiguracoesMenu from './ConfiguracoesMenu';

function IconesBarraSuperiorDireito() {
  return (
    <div className="icones-topo">
      <img className="utilizador-img" src={blackImage} alt="User" />
      <img src={notificationIcon} alt="Notificações" />
      <ConfiguracoesMenu />
    </div>
  );
}
  
  export default IconesBarraSuperiorDireito;
  