import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistarInputs2 from '../componentes/Login e Registar/RegistarInputs2';
import ImagemLoginRegistar from '../componentes/Login e Registar/ImagemLoginRegistar';
import '../styles/Registo.css';

function Registar2() {
  const navigate = useNavigate();

  // Estado dos campos do passo 2
  const [cidade, setCidade] = useState('');
  const [freguesia, setFreguesia] = useState('');
  const [rua, setRua] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  const fazerRegisto = async (e) => {
    e.preventDefault();

    // Recupera dados do passo 1
    const parte1 = JSON.parse(sessionStorage.getItem('registo_parte1') || '{}');

    const payload = {
      nome: parte1.nome,
      email: parte1.email,
      password: parte1.password,
      data_nascimento: parte1.data_nascimento,
      cidade,
      freguesia,
      rua,
      codigo_postal: codigoPostal
    };

    try {
      const res = await fetch('http://localhost:3000/registar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        // Apenas redireciona para o login
        navigate('/login');
      } else {
        alert(data.error || 'Erro no registo.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de rede ao registar.');
    }
  };

  return (
    <div className="login-container">
      <RegistarInputs2
        cidade={cidade} setCidade={setCidade}
        freguesia={freguesia} setFreguesia={setFreguesia}
        rua={rua} setRua={setRua}
        codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal}
        onSubmit={fazerRegisto}
      />
      <ImagemLoginRegistar />
    </div>
  );
}

export default Registar2;
