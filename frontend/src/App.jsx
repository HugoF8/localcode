import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';
import PublicacoesETickets from './pages/PublicacoesETicketsUtilizador';
import Login from './pages/Login';
import Registar1 from './pages/Registar1';
import Registar2 from './pages/Registar2';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-freguesia" element={<CriarFreguesia />} />
        <Route path="/publicacoes-tickets-utilizador" element={<PublicacoesETickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registar1" element={<Registar1 />} />
        <Route path="/registar2" element={<Registar2 />} />
      </Routes>
    </Router>
  );
}
export default App;