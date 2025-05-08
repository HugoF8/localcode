import config from '../../assets/config-icon.png';
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

  const modPages = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');

  const terminarSessao = () => {
    localStorage.removeItem('token'); // Limpa o token
    localStorage.removeItem('id_utilizador');
    sessionStorage.removeItem('paginasModeradas');
    sessionStorage.removeItem('paginasAdmin');
    navigate('/'); // Redireciona para login
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
          <button onClick={() => navigate('/pedidos')}>Pedido</button>
          {modPages.length > 0 && (
          <button onClick={() => navigate('/AprovacoesTickets')}>AprovacoesTickets</button>
          )}
          <button onClick={() => navigate('/criar-post')}>Post</button>
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
