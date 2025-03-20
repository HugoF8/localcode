/*
*	<copyright file="TICKET" company="LocalCode"> </copyright> 
*	<author>Gonçalo Figueiredo</author>
*	<contact>a26747@alunos.ipca.pt</contact>
**/

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    //Tipos de ticket
    public enum estadosTicket
    {
        Pendente,
        Recusado,
        Aceite
    }
    /// <summary>
    /// Classe base que representa um utilizador.
    /// </summary>
    public class TICKET
    {
        #region Atributos

        int idTicket;
        int idUtilizador;
        int idPagina;
        DateTime dataCriacao;
        string descricaoProblema;
        estadosTicket estadoTicket;

        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão 
        /// </summary>
        public TICKET()
        {
            this.idTicket = 0;
            this.idUtilizador = 0;
            this.idPagina = 0;
            this.dataCriacao = DateTime.MinValue;
            this.descricaoProblema = "";
            this.estadoTicket = estadosTicket.Pendente;
        }

        /// <summary>
        /// Construtor por parametros
        /// </summary>
        /// <param name="nome"></param>
        /// <param name="apelido"></param>
        /// <param name="idade"></param>
        /// <param name="nIF"></param>
        /// <param name="sNS"></param>
        public TICKET(int idTicket, int idUtilizador, int idPagina, DateTime dataCriacao, string descricaoProblema, estadosTicket estadoTicket)
        {
            this.idTicket = idTicket;
            this.idUtilizador = idUtilizador;
            this.idPagina = idPagina;
            this.dataCriacao = dataCriacao;
            this.descricaoProblema = descricaoProblema;
            this.estadoTicket = estadoTicket;
        }
        #endregion

        #region Propriedades

        /// <summary>
        /// Obtém e define.
        /// </summary>
        public int IDticket
        {
            get { return idTicket; }
        }

        public int IDutilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        public int IDpagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        public DateTime DataCriacao
        {
            get { return dataCriacao; }
            set { dataCriacao = value; }
        }

        public string DescricaoProblema
        {
            get { return descricaoProblema; }
            set { descricaoProblema = value; }
        }

        public estadosTicket EstadoTicket
        {
            get { return estadoTicket; }
            set { estadoTicket = value; }
        }

        #endregion


        #endregion
    }
}