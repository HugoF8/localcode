import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';
import PublicacoesETickets from './pages/PublicacoesETicketsUtilizador';
import './App.css';
import EnviarTicket from './pages/EnviarTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/publicacoes-tickets-utilizador" element={<PublicacoesETickets />} />
        <Route path="/pages/EnviarTicket" element={<EnviarTicket />} />
      </Routes>
    </Router>
  );
}
export default App;