import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarFreguesia from './pages/CriarFreguesia';

import PublicacoesETickets from './pages/PublicacoesETickets';
import AprovacoesTickets from './pages/AprovacoesTickets';

import PublicacoesETickets from './pages/PublicacoesETicketsUtilizador';
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

        <Route path="/publicacoes-tickets" element={<PublicacoesETickets />} />
        <Route path="/AprovacoesTickets" element={<AprovacoesTickets />} />

        <Route path="/publicacoes-tickets-utilizador" element={<PublicacoesETickets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registar1" element={<Registar1 />} />
        <Route path="/registar2" element={<Registar2 />} />
        <Route path="/enviar-ticket" element={<EnviarTicket />} />

      </Routes>
    </Router>
  );
}
export default App;