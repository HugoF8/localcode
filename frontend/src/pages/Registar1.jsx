import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistarInputs1 from '../componentes/Login e Registar/RegistarInputs1';
import ImagemLoginRegistar from '../componentes/Login e Registar/ImagemLoginRegistar';
import '../styles/Registo.css';

function Registar1() {
  const navigate = useNavigate();

  // Estado dos campos do passo 1
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetir, setRepetir] = useState('');
  const [nascimento, setNascimento] = useState('');

  const irParaRegistar2 = (e) => {
    e.preventDefault();

    if (password !== repetir) {
      return alert('As passwords não coincidem.');
    }

    // Guarda temporariamente no sessionStorage (não persiste após fechar)
    sessionStorage.setItem(
      'registo_parte1',
      JSON.stringify({ nome, email, password, data_nascimento: nascimento })
    );

    navigate('/registar2');
  };

  return (
    <div className="login-container">
      <RegistarInputs1
        nome={nome} setNome={setNome}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        repetir={repetir} setRepetir={setRepetir}
        nascimento={nascimento} setNascimento={setNascimento}
        onNext={irParaRegistar2}
      />
      <ImagemLoginRegistar />
    </div>
  );
}

export default Registar1;
