import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';


function PublicacoesUtilizador() {
  return (
    <div className="pagina">
      <BarraSuperior />
      <div className="conteudo-principal">
        <BarraLateral />
        <main className="zona-central">
          <h1>Área do Utilizador - Publicações</h1>
          <NavegacaoUtilizador />
          <Publicacoes />
        </main>
      </div>
    </div>
  );
}

export default PublicacoesUtilizador;
