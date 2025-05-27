// src/componentes/LoginLembrar.jsx
import React from 'react';

function LoginLembrar({ rememberMe, setRememberMe }) {
  return (
    <div className="lembrar-me-container">
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <span className="lembrar-text">Lembrar-me</span>
      </label>
    </div>
  );
}
export default LoginLembrar;
