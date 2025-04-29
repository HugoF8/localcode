import { useNavigate } from 'react-router-dom';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import '../styles/EnviarTicket.css';

function EnviarTicket() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para enviar dados
    alert('Ticket enviado!');
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />
        <div className="conteudo-criar">
          <h2>Ticket</h2>
          <hr />
          <form className="formulario" onSubmit={handleSubmit}>
            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" placeholder="Descrição" rows="5" required></textarea>

            <button type="submit" className="btn-enviar">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnviarTicket;
