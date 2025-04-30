import React from 'react';

function RegistarInputs2({
  cidade, setCidade,
  freguesia, setFreguesia,
  rua, setRua,
  codigoPostal, setCodigoPostal,
  onSubmit
}) {
  return (
    <div className="login-left">
      <form className="login-form" onSubmit={onSubmit}>
        <h1>Registar</h1>
        <span style={{ fontWeight: 'bold', textAlign: 'right' }}>Morada</span>

        <div className="input-box">
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Freguesia"
            value={freguesia}
            onChange={e => setFreguesia(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Rua"
            value={rua}
            onChange={e => setRua(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Código-postal"
            value={codigoPostal}
            onChange={e => setCodigoPostal(e.target.value)}
            required
          />
        </div>

        <button className="btn-entrar" type="submit">
          Registar
        </button>
      </form>
    </div>
  );
}

export default RegistarInputs2;
