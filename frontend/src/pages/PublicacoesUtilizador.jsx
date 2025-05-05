import { useEffect, useState } from 'react';
import BarraPublicacoesEtickets from '../componentes/BarraPublicacoesEtickets';
import BarraSuperior from '../componentes/BarraSuperior';
import BarraLateral from '../componentes/BarraLateral';
import PublicacoesNaoAprovadasUtilizador from '../componentes/PublicacoesAprovUtilizador/PublicacoesNaoAprovadasUtilizador';
import PublicacoesAprovadasUtilizador from '../componentes/PublicacoesAprovUtilizador/PublicacoesAprovadasUtilizador';

import '../styles/PublicacoesEtickets.css';

function PublicacoesUtilizador() {
  const [posts, setPosts] = useState({ aprovados: [], recusados: [] });
  const [expandidoId, setExpandidoId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [resAprovados, resRecusados] = await Promise.all([
          fetch('http://localhost:3000/api/posts/aprovados', config),
          fetch('http://localhost:3000/api/posts/recusados', config),
        ]);

        if (!resAprovados.ok || !resRecusados.ok) {
          throw new Error('Erro ao buscar publicações');
        }

        const aprovados = await resAprovados.json();
        const recusadosRaw = await resRecusados.json();

        const recusados = recusadosRaw.map(post => ({
          ...post,
          input: '',
        }));

        setPosts({ aprovados, recusados });
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const onToggleExpand = (id) => {
    setExpandidoId(prev => (prev === id ? null : id));
  };

  const onInputChange = (id, valor) => {
    setPosts(prev => ({
      ...prev,
      recusados: prev.recusados.map(post =>
        post.id_post === id ? { ...post, input: valor } : post
      ),
    }));
  };

  const onAlterar = async (id) => {
    const post = posts.recusados.find(p => p.id_post === id);
    if (!post) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/posts/alterarInformacoesPost/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ descricao_post: post.input }),
      });

      if (!res.ok) throw new Error('Falha ao alterar publicação');

      alert('Publicação alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar publicação:', error);
    }
  };

  const onApagar = async (id) => {
    if (!window.confirm('Tens a certeza que queres apagar esta publicação?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/posts/alterarInformacoesPost/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ descricao_post: '', media_post: null }),
      });

      if (!res.ok) throw new Error('Falha ao apagar publicação');

      setPosts(prev => ({
        ...prev,
        recusados: prev.recusados.filter(p => p.id_post !== id),
      }));

      alert('Publicação apagada com sucesso!');
    } catch (error) {
      console.error('Erro ao apagar publicação:', error);
    }
  };

  return (
    <div className="container">
      <BarraSuperior />
      <div className="flex">
        <BarraLateral />
        <div className="conteudo">
          <BarraPublicacoesEtickets />
          <PublicacoesNaoAprovadasUtilizador
            posts={posts.recusados}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
            onInputChange={onInputChange}
            onAlterar={onAlterar}
            onApagar={onApagar}
          />
          <PublicacoesAprovadasUtilizador
            posts={posts.aprovados}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
          />
        </div>
      </div>
    </div>
  );
}

export default PublicacoesUtilizador;
