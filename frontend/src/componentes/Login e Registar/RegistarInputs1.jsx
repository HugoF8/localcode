import React from 'react';

function RegistarInputs1({
  nome, setNome,
  email, setEmail,
  password, setPassword,
  repetir, setRepetir,
  nascimento, setNascimento,
  onNext
}) {
  return (
    <div className="login-left">
      <form className="login-form" onSubmit={onNext}>
        <h1>Registar</h1>
        <span style={{ fontWeight: 'bold', textAlign: 'right' }}>Dados</span>

        <div className="input-box">
          <span className="icon">👤</span>
          <input
            type="text"
            placeholder="Nome do Utilizador"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <span className="icon">✉️</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <span className="icon">🔒</span>
          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <span className="icon">🔒</span>
          <input
            type="password"
            placeholder="Repetir Palavra-passe"
            value={repetir}
            onChange={e => setRepetir(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <span className="icon">📅</span>
          <input
            type="date"
            value={nascimento}
            onChange={e => setNascimento(e.target.value)}
            required
          />
        </div>

        <button className="btn-entrar" type="submit">
          Seguinte
        </button>
      </form>
    </div>
  );
}

export default RegistarInputs1;
