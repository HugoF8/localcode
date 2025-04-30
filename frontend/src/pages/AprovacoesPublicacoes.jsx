import { useState, useEffect } from 'react';
import axios from 'axios';
import BarraPublicacoesEticketsMod from '../componentes/BarraPublicacoesEticketsMod';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import AprovacaoPublicacao from '../componentes/AprovacaoPublicacao';
import FotoPerfil from '../componentes/FotoPerfil';
import '../styles/AprovacoesTicketsePublicacoes.css';



function AprovacoesPublicacoes() {
    const [publicacoes, setPublicacoes] = useState([]);
  
    useEffect(() => {
      const mockPublicacoes = [
        {
          id: 1,
          nome: 'João',
          descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.',
          imagemPublicacao: '/imagem-joao.jpg',
          imagemPerfil: 'blackpremium.jpg',
          tipo: 'imagem',
        },
        {
          id: 2,
          nome: 'Dolores',
          descricao: 'Lorem ipsum dolor sit amet, adipiscing elit ?',
          imagemPerfil: 'blackpremium.jpg',
          tipo: 'poll',
          opcoes: [
            { id: 'a', texto: 'Amarelo', selecionada: true },
            { id: 'b', texto: 'Castanho', selecionada: false },
            { id: 'c', texto: 'Preto', selecionada: false },
          ],
          dataTermino: '13/05/2025',
        },
      ];
      setPublicacoes(mockPublicacoes);
    }, []);
  
    const handleAprovar = (id) => {
      console.log('Aprovado publicação:', id);
    };
  
    const handleRecusar = (id) => {
      console.log('Recusado publicação:', id);
    };
  
    return (
      <div className="container">
        <BarraSuperior />
        <div className="flex">
          <BarraLateral />
          <div className="conteudo">
            <BarraPublicacoesEticketsMod />
            <AprovacaoPublicacao
              publicacoes={publicacoes}
              onAprovar={handleAprovar}
              onRecusar={handleRecusar}
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default AprovacoesPublicacoes;