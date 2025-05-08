// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      console.log('Login response:', data);

      if (!res.ok) {
        return toast.error(data.error || 'Credenciais inválidas');
      }

      // 1. Armazenar token e utilizador
      const { token, utilizador } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('utilizador', JSON.stringify(utilizador));
      localStorage.setItem('id_utilizador', utilizador.id_utilizador);

      // 2. Extrair páginas de moderador com fallback para array vazio
      const paginasArray = Array.isArray(utilizador.paginas)
        ? utilizador.paginas
        : [];
      const modPages = paginasArray
        .filter(p => p.role === 'moderador')
        .map(p => p.id_pagina);
      sessionStorage.setItem('paginasModeradas', JSON.stringify(modPages));

      // 3. Guardar também o token em sessionStorage se não lembrar
      if (!rememberMe) {
        sessionStorage.setItem('token', token);
      }

      // 4. Finalmente navega
      navigate('/home');

    } catch (err) {
      console.error('Erro no login:', err);
      toast.error('Erro de rede. Tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-right" />
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
