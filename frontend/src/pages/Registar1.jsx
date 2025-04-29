import React from 'react';
import RegistarInputs1 from '../componentes/RegistarInputs1';
import ImagemLoginRegistar from '../componentes/ImagemLoginRegistar';
import '../styles/Registo.css';
import { useNavigate } from 'react-router-dom';


const Registar1 = () => {
  const navigate = useNavigate();

  const irParaRegistar2 = (e) => {
    e.preventDefault();
    navigate('/registar2');
  };

  return (
    <div className="login-container">
      <RegistarInputs1 onNext={irParaRegistar2} />
      <ImagemLoginRegistar />
    </div>
  );
};

export default Registar1;
