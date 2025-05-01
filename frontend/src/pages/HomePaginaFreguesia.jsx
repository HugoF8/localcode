import '../styles/Home.css';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import BotaoSeguir from '../componentes/PaginaFreguesia/Seguir';
import CriarPost from '../componentes/CriarPost';
import PostsFreguesia from '../componentes/PaginaFreguesia/PostsFreguesia';
import InfosFreguesia from '../componentes/PaginaFreguesia/InfosFreguesia';

function HomeFreguesia() {
  return (
    <div className="container">
      <BarraSuperior />
      <div className="corpo">
        <BarraLateral />

        <div className="zona-publicacoes">
          {/* informações freguesia */}
          <InfosFreguesia />

          {/* Botão de seguir à página */}
          <BotaoSeguir />

          {/* Formulário de criação de post — SEMPRE visível */}
          <CriarPost />

          {/* buscar posts */}
          <PostsFreguesia />
        </div>
      </div>
    </div>
  );
}

export default HomeFreguesia;