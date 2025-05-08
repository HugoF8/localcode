// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
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
import EditarFreguesia from './pages/EditarFreguesia';
import TodasNotificacoes from './pages/TodasNotificacoes';


import './App.css';


function RequireModerator({ children }) {
  const modPages = JSON.parse(sessionStorage.getItem('paginasModeradas') || '[]');
  // Se não for moderador em nenhuma página, redireciona
  if (modPages.length === 0) return <Navigate to="/home" replace />;
  return children;
}

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Pagina/:id" element={<HomeFreguesia />} />
          <Route path="/Pagina/:id/EditarPagina" element={<RequireModerator><EditarFreguesia /></RequireModerator>} />
          <Route path="/Pagina/:id/enviar-ticket" element={<EnviarTicket />} />
          <Route path="/criar-freguesia" element={<CriarFreguesia />} />
          <Route path="/publicacoes-utilizador" element={<PublicacoesUtilizador />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/tickets-utilizador" element={<TicketsUtilizador />} />
          <Route path="/AprovacoesTickets" element={<RequireModerator><AprovacoesTickets /></RequireModerator>} />
          <Route path="/AprovacoesPublicacoes" element={<RequireModerator><AprovacoesPublicacoes /></RequireModerator>} />
          <Route path="/AprovacoesPedidos" element={<RequireModerator><AprovacoesPedidos /></RequireModerator>} />
          <Route path="/" element={<Login />} />
          <Route path="/registar1" element={<Registar1 />} />
          <Route path="/registar2" element={<Registar2 />} />
          <Route path="/enviar-ticket" element={<EnviarTicket />} />
          <Route path="/editar-pedido/:id" element={<EditarPedido />} />
          <Route path="/notificacoes" element={<TodasNotificacoes />} />
        </Routes>
      </Router>
  );
}

export default App;
