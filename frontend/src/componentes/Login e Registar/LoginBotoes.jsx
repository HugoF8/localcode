// src/componentes/LoginBotoes.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginBotoes() {
  const navigate = useNavigate();
  return (
    <>
      <button type="submit" className="btn-entrar">Entrar</button>
      <button
        type="button"
        className="btn-registar"
        onClick={() => navigate('/registar1')}
      >
        Registar
      </button>
    </>
  );
}

export default LoginBotoes;
