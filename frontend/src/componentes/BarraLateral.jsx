
import junta from '../assets/Junta_Urgezes.jpg';
import brasao from '../assets/Urgezes_brasao.png';

function BarraLateral() {
  const icones = [
    junta,
    brasao
  ];

  return (
    <div className="barra-lateral">
      <ul>
        {icones.map((icone, index) => (
          <li key={index}>
            <img src={icone} alt={`Ícone ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BarraLateral;