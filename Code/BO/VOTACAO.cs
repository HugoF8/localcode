/*
*	<copyright file="VOTACAO" company="LocalCode"> </copyright> 
*	<author>Hugo Azevedo</author>
*	<contact>a25431@alunos.ipca.pt</contact>
**/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    // Estado da Vota��o
    public enum estadosVotacao
    {
        Pendente,
        Realizada
        
    };

    /// <summary>
    /// Classe base que representa a vota��o.
    /// </summary>
    public class VOTACAO
    {
        #region Atributos

        int idVotacao;
        int idUtilizador;
        int idPagina;
        string tituloVotacao;
        DateTime dataCriacao;
        DateTime dataExpiracao;
        estadosVotacao estadoVotacao;

        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// Construtor padr�o para vota��o
        /// </summary>
        public VOTACAO()
        {
            this.idVotacao = 0;
            this.idUtilizador = 0;
            this.idPagina = 0;
            this.tituloVotacao = "";
            this.dataCriacao = DateTime.MinValue;
            this.dataExpiracao = DateTime.MinValue;
            this.estadoVotacao = estadosVotacao.Pendente;
        }

        /// <summary>
        /// Construtor por parametros para vota��o
        /// </summary>
        /// <param name="idVotacao"></param>
        /// <param name="idUtilizador"></param>
        /// <param name="idPagina"></param>
        /// <param name="tituloVotacao"></param>
        /// <param name="dataCricao"></param>
        /// <param name="dataExpiracao"></param>
        /// <param name="estadoVotacao"></param>
        public VOTACAO(int idVotacao, int idUtilizador, int idPagina, string tituloVotacao, DateTime dataCricao, DateTime dataExpiracao, estadosVotacao estadoVotacao)
        {
            this.idVotacao = 0;
            this.idUtilizador = 0;
            this.idPagina = 0;
            this.tituloVotacao = "";
            this.dataCriacao = DateTime.MinValue;
            this.dataExpiracao = DateTime.MinValue;
            this.estadoVotacao = estadoVotacao;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obt�m o identificar �nico da vota��o.
        /// </summary>
        public int IdVotacao
        {
            get { return idVotacao; }
        }

        /// <summary>
        /// Obt�m ou define o identificador �nico do utilizador.
        /// </summary>
        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        /// <summary>
        /// Obt�m ou define o identificador �nico da p�gina.
        /// </summary>
        public int IdPagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        /// <summary>
        /// Obt�m ou define o t�tulo da vota��o.
        /// </summary>
        public string TituloVotacao
        {
            get { return tituloVotacao; }
            set { tituloVotacao = value; }
        }

        /// <summary>
        /// Obt�m ou define a data da cria��o.
        /// </summary>
        public DateTime DataCriacao
        {
            get { return dataCriacao; }
            set { dataCriacao = value; }
        }

        /// <summary>
        /// Obt�m ou define a data de expira��o.
        /// </summary>
        public DateTime DataExpiracao
        {
            get { return dataExpiracao; }
            set { dataExpiracao = value; }
        }

        /// <summary>
        /// Obt�m ou define o estado da vota��o.
        /// </summary>
        public estadosVotacao EstadoVotacao
        {
            get { return estadoVotacao; }
            set { estadoVotacao = value; }
        }


        #endregion


        #endregion
    }
}