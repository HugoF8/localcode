import blackImage from '../assets/black.jpg';
import notificationIcon from '../assets/notification-icon.png';
import configIcon from '../assets/config-icon.png';

function IconesTopo() {
  return (
    <div className="icones-topo">
      <img className="utilizador-img" src={blackImage} alt="User" />
      <img src={notificationIcon} alt="Notificações" />
      <img src={configIcon} alt="Definições" />
    </div>
  );
}
  
  export default IconesTopo;
  