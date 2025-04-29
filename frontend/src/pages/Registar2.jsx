import React from 'react';
import RegistarInputs2 from '../componentes/RegistarInputs2';
import ImagemLoginRegistar from '../componentes/ImagemLoginRegistar';
import '../styles/Registo.css';


const Registar2 = () => {
  const fazerRegisto = (e) => {
    e.preventDefault();
    alert('Registado com sucesso!');
  };

  return (
    <div className="login-container">
      <RegistarInputs2 onSubmit={fazerRegisto} />
      <ImagemLoginRegistar />
    </div>
  );
};

export default Registar2;
