import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';
import PublicacoesUtilizador from './pages/PublicacoesUtilizador';
import TicketsUtilizador from './pages/TicketsUtilizador';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/publicacoes-utilizador" element={<PublicacoesUtilizador />} />
        <Route path="/tickets-utilizador" element={<TicketsUtilizador />} />
      </Routes>
    </Router>
  );
}
export default App;