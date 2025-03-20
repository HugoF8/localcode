using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public enum estadoPedidos
    {
        Pendente,
        Aprovado,
        Reprovado
    };
    /// <summary>
    /// 
    /// </summary>
    public class PEDIDOPAGINA
    {
        #region Atributos

        int idPedido;
        int idUtilizador;
        int idMorada;
        string dadosComprovacao;
        estadoPedidos estadoPedido;
        DateTime dataPedido;
        
        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// 
        /// </summary>
        public PEDIDOPAGINA()
        {
            this.idPedido = 0;
            this.idUtilizador = 0;
            this.idMorada = 0;
            this.dadosComprovacao = "";
            this.estadoPedido = estadoPedidos.Pendente;
            this.dataPedido = DateTime.Now;
        }
        
        public PEDIDOPAGINA(int idPedido, int idUtilizador, int idMorada, string dadosComprovacao, estadoPedidos estadoPedido, DateTime dataPedido)
        {
            this.idPedido = idPedido;
            this.idUtilizador = idUtilizador;
            this.idMorada = idMorada;
            this.dataPedido = dataPedido;
            this.dadosComprovacao = dadosComprovacao;
            this.estadoPedido = estadoPedido;
            this.dataPedido = dataPedido;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// 
        /// </summary>
        public int IdPedido
        {
            get { return this.idPedido; }
        }

        public int IdUtilizador
        {
            get { return this.idUtilizador; }
            set { this.idUtilizador = value; }
        }

        public int IdMorada
        {
            get { return this.idMorada; }
            set { this.idMorada = value; }
        }

        public string DadosComprovacao
        {
            get { return this.dadosComprovacao; }
            set { this.dadosComprovacao = value; }
        }

        public estadoPedidos EstadoPedido
        {
            get { return this.estadoPedido; }
            set { this.estadoPedido = value; }
        }

        public DateTime DataPedido
        {
            get { return this.dataPedido; }
            set { this.dataPedido = value; }
        }

        #endregion


        #endregion
    }
}