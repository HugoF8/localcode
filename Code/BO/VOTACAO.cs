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
    // Estado da Votação
    public enum estadosVotacao
    {
        Pendente,
        Realizada
        
    };

    /// <summary>
    /// Classe base que representa a votação.
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

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão para votação
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
        /// Construtor por parametros para votação
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
        /// Obtém o identificar único da votação.
        /// </summary>
        public int IdVotacao
        {
            get { return idVotacao; }
        }

        /// <summary>
        /// Obtém ou define o identificador único do utilizador.
        /// </summary>
        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        /// <summary>
        /// Obtém ou define o identificador único da página.
        /// </summary>
        public int IdPagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        /// <summary>
        /// Obtém ou define o título da votação.
        /// </summary>
        public string TituloVotacao
        {
            get { return tituloVotacao; }
            set { tituloVotacao = value; }
        }

        /// <summary>
        /// Obtém ou define a data da criação.
        /// </summary>
        public DateTime DataCriacao
        {
            get { return dataCriacao; }
            set { dataCriacao = value; }
        }

        /// <summary>
        /// Obtém ou define a data de expiração.
        /// </summary>
        public DateTime DataExpiracao
        {
            get { return dataExpiracao; }
            set { dataExpiracao = value; }
        }

        /// <summary>
        /// Obtém ou define o estado da votação.
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