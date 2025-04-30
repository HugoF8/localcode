import '../styles/FotoPerfil.css';
import fotoPerfil from '../assets/blackpremium.jpg'; // Caminho ajusta conforme estrutura

export default function FotoPerfil({ nome }) {
    return (
      <div className="card">
        <img src={fotoPerfil} alt={`Foto de perfil de ${nome}`} className="foto" />
        <p className="nome">{nome}</p>
      </div>
  );
}