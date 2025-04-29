import LoginInputs from '../componentes/LoginInputs';
import LoginLembrar from '../componentes/LoginLembrar';
import LoginBotoes from '../componentes/LoginBotoes';
import ImagemLoginRegistar from '../componentes/ImagemLoginRegistar';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form">
          <LoginInputs />
          <LoginLembrar />
          <LoginBotoes />
        </form>
      </div>
      <ImagemLoginRegistar />
    </div>
  );
}

export default Login;
