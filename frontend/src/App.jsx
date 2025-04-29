import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';
import EditarPedido from './pages/EditarPedido';
import PublicacoesUtilizador from './pages/PublicacoesUtilizador';
import TicketsUtilizador from './pages/TicketsUtilizador';
import AprovacoesTickets from './pages/AprovacoesTickets';
import Login from './pages/Login';
import Registar1 from './pages/Registar1';
import Registar2 from './pages/Registar2';
import EnviarTicket from './pages/EnviarTicket';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/editar-pedido" element={<EditarPedido />} />
        <Route path="/publicacoes-utilizador" element={<PublicacoesUtilizador />} />
        <Route path="/tickets-utilizador" element={<TicketsUtilizador />} />
        <Route path="/AprovacoesTickets" element={<AprovacoesTickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registar1" element={<Registar1 />} />
        <Route path="/registar2" element={<Registar2 />} />
        <Route path="/enviar-ticket" element={<EnviarTicket />} />
      </Routes>
    </Router>
  );
}
export default App;