import React, { useEffect, useRef } from 'react';

function VerificadorTipoUtilizador() {
  const intervalRef = useRef(null);

  const verificarTipoUtilizador = async () => {
    const token = localStorage.getItem('token');
    const id_utilizador = localStorage.getItem('id_utilizador');
    const utilizadorArmazenado = JSON.parse(localStorage.getItem('utilizador'));

    try {
      const resposta = await fetch(`/api/utilizadores/${id_utilizador}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!resposta.ok) {
        throw new Error('Falha ao buscar utilizador');
      }

      const utilizadorAtualizado = await resposta.json();

      if (utilizadorAtualizado.tipo_utilizador !== utilizadorArmazenado.tipo_utilizador) {
        console.warn('Tipo de utilizador foi alterado!');
        // Atualiza o localStorage ou toma outra ação
        localStorage.setItem('utilizador', JSON.stringify(utilizadorAtualizado));
        // Exemplo: redirecionamento ou aviso
        // window.location.href = '/login';
      }
    } catch (erro) {
      console.error('Erro ao verificar tipo de utilizador:', erro);
    }
  };

  useEffect(() => {
    // Primeira verificação imediata
    verificarTipoUtilizador();
    // Verificação a cada 10 minutos (600000 ms)
    intervalRef.current = setInterval(verificarTipoUtilizador, 600000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return null; // Componente invisível
}

export default VerificadorTipoUtilizador;
