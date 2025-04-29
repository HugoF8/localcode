import React from 'react';

const RegistarInputs1 = ({ onNext }) => (
  <div className="login-left">
    <form className="login-form" onSubmit={onNext}>
      <h1>Registar</h1>
      <span style={{ fontWeight: 'bold', textAlign: 'right' }}>Dados</span>

      <div className="input-box">
        <span className="icon">👤</span>
        <input type="text" placeholder="Nome do Utilizador" required />
      </div>

      <div className="input-box">
        <span className="icon">✉️</span>
        <input type="email" placeholder="Email" required />
      </div>

      <div className="input-box">
        <span className="icon">🔒</span>
        <input type="password" placeholder="Palavra-passe" required />
        <button className="mostrar-btn" type="button">Mostrar</button>
      </div>

      <div className="input-box">
        <span className="icon">🔒</span>
        <input type="password" placeholder="Repetir Palavra-passe" required />
        <button className="mostrar-btn" type="button">Mostrar</button>
      </div>

      <div className="input-box">
        <span className="icon">📅</span>
        <input type="date" required />
      </div>

      <button className="btn-entrar" type="submit">Seguinte</button>
    </form>
  </div>
);

export default RegistarInputs1;
