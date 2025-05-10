import configIcon from '../../assets/config-icon.png';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfiguracoesMenu() {
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function fecharAoClicarFora(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    window.addEventListener('mousedown', fecharAoClicarFora);
    return () => window.removeEventListener('mousedown', fecharAoClicarFora);
  }, []);

  const modPages = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');
  const user = JSON.parse(localStorage.getItem('utilizador') || '{}');
  const isAdmin = user.tipo_utilizador === 'admin';

  const toggleMenu = () => setAberto(v => !v);
  const terminarSessao = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="config-wrapper" ref={wrapperRef}>
      <img
        src={configIcon}
        alt="Configurações"
        className="icone-config"
        onClick={toggleMenu}
      />
      {aberto && (
        <div className="config-menu">
          <button onClick={() => navigate('/criar-freguesia')}>
            Criar Freguesia
          </button>
          {isAdmin && (
            <button onClick={() => navigate('/AprovacoesPedidos')}>
              Aprovações de Pedidos
            </button>
          )}
          <button onClick={() => navigate('/pedidos')}>
            Meus Pedidos
          </button>
          <button onClick={() => navigate('/tickets-utilizador')}>
            Publicações & Tickets
          </button>
          {modPages.length > 0 && (
            <button onClick={() => navigate('/AprovacoesTickets')}>
              Aprovar Tickets & Posts
            </button>
          )}
          <button onClick={terminarSessao}>
            Terminar Sessão
          </button>
        </div>
      )}
    </div>
  );
}

export default ConfiguracoesMenu;
