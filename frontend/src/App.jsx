import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';
import PublicacoesETickets from './pages/PublicacoesETicketsUtilizador';
import EditarPedido from './pages/EditarPedido';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/publicacoes-tickets-utilizador" element={<PublicacoesETickets />} />
        <Route path="/editar-pedido" element={<EditarPedido />} />
      </Routes>
    </Router>
  );
}
export default App;