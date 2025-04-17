import configIcon from '../assets/config-icon.png';
import { useState } from 'react';

function ConfiguracoesMenu() {
  const [aberto, setAberto] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setAberto(!aberto);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const terminarSessao = () => {
    alert('Sessão terminada!');
    // Aqui podes redirecionar ou limpar tokens, etc.
  };

  return (
    <div className="config-wrapper">
      <img
        src={configIcon}
        alt="Definições"
        onClick={toggleMenu}
        className="icone-config"
      />
      {aberto && (
        <div className="config-menu">
          <button onClick={terminarSessao}>Terminar Sessão</button>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ConfiguracoesMenu;
