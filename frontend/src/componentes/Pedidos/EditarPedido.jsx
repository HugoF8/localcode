import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/CriarFreguesia.css';

function EditarPedidoC() {
  const [dadosPedido, setDadosPedido] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [documentos, setDocumentos] = useState([]);

  const [nomefreguesia, setNomeFreguesia] = useState('');
  const [cidade, setCidade] = useState('');
  const [freguesia, setFreguesia] = useState('');
  const [rua, setRua] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const pedidoSalvo = localStorage.getItem('pedidoParaEditar');
    if (!pedidoSalvo) {
      toast.error('Pedido não encontrado.');
      navigate('/pedidos');
      return;
    }

    const pedido = JSON.parse(pedidoSalvo);
    setDadosPedido(pedido);

    setNomeFreguesia(pedido.nomefreguesia || '');
    setCidade(pedido.morada?.cidade || '');
    setFreguesia(pedido.morada?.freguesia || '');
    setRua(pedido.morada?.rua || '');
    setCodigoPostal(pedido.morada?.codigo_postal?.toString() || '');

    if (pedido.dados_comprovacao) {
      setDocumentos([{ name: pedido.dados_comprovacao, size: 0, isExisting: true }]);
    }

    setCarregando(false);
  }, [id, navigate]);

  const handleFileChange = (e) => {
    setDocumentos(Array.from(e.target.files));
  };

  const removerDocumento = (index) => {
    setDocumentos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nomefreguesia || !cidade || !freguesia || !rua || !codigoPostal || documentos.length === 0) {
      toast.error('Preencha todos os campos.');
      return;
    }

    const payload = {
      nomefreguesia,
      cidade,
      freguesia,
      rua,
      codigo_postal: codigoPostal,
      dados_comprovacao: documentos[0].name
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/pedidosPagina/alterarPedidoPagina/${dadosPedido.id_pedido}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) throw new Error('Erro na atualização');

      toast.success('Pedido atualizado com sucesso!');
      navigate('/pedidos');
    } catch (err) {
      console.error(err);
      toast.error('Falha ao atualizar pedido.');
    }
  };

  if (carregando) return <div>Carregando...</div>;

  return (
    <div className="conteudo-criar">
      <ToastContainer position="top-right" />
      <h2>Editar Pedido de Freguesia</h2>
      <hr />
      <form className="formulario" onSubmit={handleSubmit}>
        <label>Nome da Freguesia</label>
        <input
          value={nomefreguesia}
          onChange={e => setNomeFreguesia(e.target.value)}
          required
        />

        <label>Cidade</label>
        <input
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          required
        />

        <label>Freguesia</label>
        <input
          value={freguesia}
          onChange={e => setFreguesia(e.target.value)}
          required
        />

        <label>Rua</label>
        <input
          value={rua}
          onChange={e => setRua(e.target.value)}
          required
        />

        <label>Código Postal</label>
        <input
          value={codigoPostal}
          onChange={e => setCodigoPostal(e.target.value)}
          required
        />

        <label>Documentos</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          required
        />

        {documentos.length > 0 && (
          <div className="preview-documentos-inside">
            {documentos.map((file, idx) => (
              <div key={idx} className="documento-card">
                <span>{file.name}</span>
                <button type="button" onClick={() => removerDocumento(idx)}>✖️</button>
              </div>
            ))}
          </div>
        )}

        <div className="botoes-acao">
          <button type="button" onClick={() => navigate('/pedidos')} className="btn-cancelar">Cancelar</button>
          <button type="submit" className="btn-enviar">Atualizar Pedido</button>
        </div>
      </form>
    </div>
  );
}

export default EditarPedidoC;
