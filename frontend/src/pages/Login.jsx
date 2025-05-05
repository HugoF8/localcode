// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginInputs from '../componentes/Login e Registar/LoginInputs';
import LoginLembrar from '../componentes/Login e Registar/LoginLembrar';
import LoginBotoes from '../componentes/Login e Registar/LoginBotoes';
import ImagemLoginRegistar from '../componentes/Login e Registar/ImagemLoginRegistar';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');       
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/autent/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })   
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('utilizador', JSON.stringify(data.utilizador));
        localStorage.setItem('id_utilizador', data.utilizador.id_utilizador);
        if (!rememberMe) sessionStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert(data.error || 'Credenciais inválidas');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de rede. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <LoginInputs
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <LoginLembrar
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />
          <LoginBotoes />
        </form>
      </div>
      <ImagemLoginRegistar />
    </div>
  );
}

export default Login;
