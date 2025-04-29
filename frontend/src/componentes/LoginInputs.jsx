import { useState } from 'react';

function LoginInputs() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <>
      <h1>Iniciar sessão</h1>

      <label htmlFor="username">Nome de utilizador</label>
      <div className="input-box">
        <span className="icon">👤</span>
        <input type="text" id="username" placeholder="Nome de utilizador" required />
      </div>

      <label htmlFor="password">Palavra-passe</label>
      <div className="input-box">
        <span className="icon">🔒</span>
        <input
          type={mostrarPassword ? 'text' : 'password'}
          id="password"
          placeholder="Palavra-passe"
          required
        />
        <button
          type="button"
          className="mostrar-btn"
          onClick={() => setMostrarPassword(!mostrarPassword)}
        >
          Mostrar
        </button>
      </div>
    </>
  );
}

export default LoginInputs;
