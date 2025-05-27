import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarraPublicacoesEtickets from '../componentes/BarraPublicacoesEtickets';
import BarraSuperior from '../componentes/Barra Lateral e Superior/BarraSuperior';
import BarraLateral from '../componentes/Barra Lateral e Superior/BarraLateral';
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
        const [resAprovados, resRecusados] = await Promise.all([
          fetch('http://localhost:3000/api/posts/verPostsAprovados', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('http://localhost:3000/api/posts/verPostsRecusados', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        if (!resAprovados.ok || !resRecusados.ok) throw new Error();

        const aprovados = await resAprovados.json();
        const recusadosRaw = await resRecusados.json();

        // Injetar campos de edição
        setPosts({
          aprovados,
          recusados: recusadosRaw.map(post => ({
            ...post,
            input: '',
            file: null    // ← campo para o novo ficheiro
          }))
        });
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const onToggleExpand = (id) =>
    setExpandidoId(prev => (prev === id ? null : id));

  const onInputChange = (id, valor) => {
    setPosts(prev => ({
      ...prev,
      recusados: prev.recusados.map(p =>
        p.id_post === id ? { ...p, input: valor } : p
      )
    }));
  };

  const onFileChange = (id, file) => {
    setPosts(prev => ({
      ...prev,
      recusados: prev.recusados.map(p =>
        p.id_post === id ? { ...p, file } : p
      )
    }));
  };

  const onAlterar = async (id) => {
    const post = posts.recusados.find(p => p.id_post === id);
    if (!post) return;

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      if (post.input) formData.append('descricao_post', post.input);
      if (post.file) formData.append('media_post', post.file);

      const res = await fetch(
        `http://localhost:3000/api/posts/alterarInformacoesPost/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}` // NÃO pôr Content-Type
          },
          body: formData
        }
      );

      if (!res.ok) throw new Error();

      setPosts(prev => ({
        ...prev,
        recusados: prev.recusados.filter(p => p.id_post !== id)
      }));
      toast.success('Publicação alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar publicação:', error);
      toast.error('Erro ao alterar publicação');
    }
  };

  const onApagar = async (id) => {
    if (!window.confirm('Tens a certeza que queres apagar esta publicação?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:3000/api/posts/eliminarPost/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (!res.ok) throw new Error();

      setPosts(prev => ({
        ...prev,
        recusados: prev.recusados.filter(p => p.id_post !== id)
      }));
      toast.success('Publicação apagada com sucesso!');
    } catch {
      toast.error('Erro ao apagar publicação');
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" />
      <BarraSuperior />
      <div className="flex">
        <BarraLateral />
        <div className="conteudoDuplo">
          <BarraPublicacoesEtickets />
          <PublicacoesNaoAprovadasUtilizador
            posts={posts.recusados}
            expandidoId={expandidoId}
            onToggleExpand={onToggleExpand}
            onInputChange={onInputChange}
            onFileChange={onFileChange} 
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
