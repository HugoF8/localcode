import { useNavigate } from 'react-router-dom';
import '../styles/PublicacoesEtickets.css';

function BarraPublicacoesETicketsMod() {
  const navigate = useNavigate();

  return (
    <div className="publicacoes-etickets-wrapper">

      <div className="botoes-navegacao">
        <button className="botao-navegacao" onClick={() => navigate('/publicacoes-utilizador')}>
          Publicações
        </button>

        <button className="botao-navegacao" onClick={() => navigate('/AprovacoesTickets')}>
          Tickets
        </button>
      </div>
    </div>
  );
}


export default BarraPublicacoesETicketsMod;