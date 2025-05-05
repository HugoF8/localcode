import React, { useState } from 'react';

function FiltroPorData({ dados, campoData, renderItem, titulo }) {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const dadosFiltrados = dados.filter((item) => {
    const dataItem = new Date(item[campoData]);
    const dataInicial = dataInicio ? new Date(dataInicio) : null;
    const dataFinal = dataFim ? new Date(dataFim) : null;

    if (dataInicial && dataFinal) {
      return dataItem >= dataInicial && dataItem <= dataFinal;
    } else if (dataInicial) {
      return dataItem >= dataInicial;
    } else if (dataFinal) {
      return dataItem <= dataFinal;
    }
    return true; // sem filtros
  });

  return (
    <div className="ticket-list-wrapper">
      <h1 className="ticket-title">{titulo}</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>

      <div>
        <label htmlFor="filtro-inicio">Data início: </label>
        <input
          type="date"
          id="filtro-inicio"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <label htmlFor="filtro-fim" style={{ marginLeft: '1rem' }}>Data fim: </label>
        <input
          type="date"
          id="filtro-fim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>

      {dadosFiltrados.map(renderItem)}
    </div>
    </div>
  );
}

export default FiltroPorData;