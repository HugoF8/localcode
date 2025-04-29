import config from '../assets/config-icon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfiguracoesMenu() {
  const [aberto, setAberto] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setAberto(!aberto);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const terminarSessao = () => {
    alert('Sessão terminada!');
    // Ex: limpar token, redirecionar
  };

  return (
    <div className="config-wrapper">
      <img
        src={config}
        alt="Definições"
        onClick={toggleMenu}
        className="icone-config"
      />
      {aberto && (
        <div className="config-menu">
          <button onClick={() => navigate('/tickets-utilizador')}>Publicações e Tickets</button>
          <button onClick={() => navigate('/criar-freguesia')}>Criar Freguesia</button>
          <button onClick={() => navigate('/editar-pedido')}>Editar Pedido</button>
          <button onClick={() => navigate('/AprovacoesTickets')}>AprovacoesTickets</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
          <button onClick={terminarSessao}>Terminar Sessão</button>
        </div>
      )}
    </div>
  );
}

export default ConfiguracoesMenu;
