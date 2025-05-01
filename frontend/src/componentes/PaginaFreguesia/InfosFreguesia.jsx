import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Home.css';

function InfosFreguesia() {
  const { id } = useParams(); // Ex: id da freguesia
  const [freguesia, setFreguesia] = useState(null);

  useEffect(() => {
    // Simulação de dados; substitua por fetch/axios para API real
    const mockData = {
      nome: 'Freguesia de Exemplo',
      fotoPerfil: 'https://via.placeholder.com/150', // URL da imagem de perfil
      fotoCapa: 'https://via.placeholder.com/600x200', // URL da imagem de capa
    };

    // Simula tempo de carregamento
    setTimeout(() => setFreguesia(mockData), 500);
  }, [id]);

  if (!freguesia) return <div>Carregando...</div>;

  return (
    <div className="freguesia-container">
      <div className="foto-capa-freguesia" style={{ backgroundImage: `url(${freguesia.fotoCapa})` }} />
      <div className="foto-perfil-container">
        <img className="foto-perfil-freguesia" src={freguesia.fotoPerfil} alt="Foto de Perfil" />
      </div>
      <h1 className="nome-freguesia">{freguesia.nome}</h1>
    </div>
  );
}

export default InfosFreguesia;
