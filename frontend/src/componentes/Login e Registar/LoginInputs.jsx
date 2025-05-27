import React, { useState } from 'react';

function LoginInputs({ email, setEmail, password, setPassword }) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <>
      <h1>Iniciar sessão</h1>

      <div className="input-box">
        <span className="icon" role="img" aria-label="email">✉️</span>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-box">
        <span className="icon" role="img" aria-label="lock">🔒</span>
        <input
          type={mostrar ? 'text' : 'password'}
          id="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="mostrar-btn"
          onClick={() => setMostrar(!mostrar)}
        >
          {mostrar ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </>
  );
}

export default LoginInputs;