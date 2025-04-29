import React from 'react';

const RegistarInputs2 = ({ onSubmit }) => (
  <div className="login-left">
    <form className="login-form" onSubmit={onSubmit}>
      <h1>Registar</h1>
      <span style={{ fontWeight: 'bold', textAlign: 'right' }}>Morada</span>

      <input type="text" className="input-box" placeholder="Cidade" required />
      <input type="text" className="input-box" placeholder="Freguesia"/>
      <input type="text" className="input-box" placeholder="Rua"/>
      <input type="text" className="input-box" placeholder="Código-postal" required />

      <button className="btn-entrar" type="submit">Registar</button>
    </form>
  </div>
);

export default RegistarInputs2;
