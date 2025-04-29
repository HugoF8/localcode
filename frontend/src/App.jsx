import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';
import PublicacoesETickets from './pages/PublicacoesETickets';
import AprovacoesTickets from './pages/AprovacoesTickets';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/publicacoes-tickets" element={<PublicacoesETickets />} />
        <Route path="/AprovacoesTickets" element={<AprovacoesTickets />} />
      </Routes>
    </Router>
  );
}
export default App;