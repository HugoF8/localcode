import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeFreguesia from './pages/HomePaginaFreguesia';
import CriarFreguesia from './pages/CriarFreguesia';
import Pedidos from './pages/Pedidos';
import PublicacoesUtilizador from './pages/PublicacoesUtilizador';
import TicketsUtilizador from './pages/TicketsUtilizador';
import AprovacoesTickets from './pages/AprovacoesTickets';
import AprovacoesPedidos from './pages/AprovacoesPedidos';
import AprovacoesPublicacoes from './pages/AprovacoesPublicacoes';
import Login from './pages/Login';
import Registar1 from './pages/Registar1';
import Registar2 from './pages/Registar2';
import EnviarTicket from './pages/EnviarTicket';
import EditarPedido from './pages/EditarPedido';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Pagina/:id" element={<HomeFreguesia />} />
        <Route path="/Pagina/:id/enviar-ticket" element={<EnviarTicket />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/publicacoes-utilizador" element={<PublicacoesUtilizador />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/tickets-utilizador" element={<TicketsUtilizador />} />
        <Route path="/AprovacoesTickets" element={<AprovacoesTickets />} />
        <Route path="/AprovacoesPublicacoes" element={<AprovacoesPublicacoes />} />
        <Route path="/AprovacoesPedidos" element={<AprovacoesPedidos />} />
        <Route path="/" element={<Login />} />
        <Route path="/registar1" element={<Registar1 />} />
        <Route path="/registar2" element={<Registar2 />} />
        <Route path="/enviar-ticket" element={<EnviarTicket />} />
        <Route path="/editar-pedido/:id" element={<EditarPedido />} />
      </Routes>
    </Router>
  );
}
export default App;