using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public enum tipoNotificacao
    {
        Comentario,
        Post,
        Ticket,
        Pagina,
    }

    public enum estadoNotificacao
    {
        lida,
        naoLida
    }

    /// <summary>
    /// Classe base que representa a morada do utilizador.
    /// </summary>
    public class NOTIFICACAO
    {
        #region Atributos

        int idNotificacao;
        int idUtilizador;
        int idPagina;
        int idPost;
        int idTicket;
        int idVotacao;
        tipoNotificacao tipoNotificacao;
        string conteudoNotificacao;

        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// Construtor padr�o para Notificacao
        /// </summary>
        public NOTIFICACAO()
        {
            this.idNotificacao = 0;
            this.idUtilizador = 0;
            this.idPagina = 0;
            this.idPost = 0;
            this.idTicket = 0;
            this.idVotacao = 0;
            //this.tipoNotificacao = null;
            this.conteudoNotificacao = "";
        }

        
        public NOTIFICACAO (int idNotificacao, int idUtilizador, int idPagina, int idPost, int idTicket, int idVotacao, tipoNotificacao tipoNotificacao, string conteudoNotificacao)
        {
            this.idNotificacao = idNotificacao;
            this.idUtilizador = idUtilizador;
            this.idPagina = idPagina;
            this.idPost = idPost;
            this.idTicket = idTicket;
            this.idVotacao = idVotacao;
            this.tipoNotificacao = tipoNotificacao;
            this.conteudoNotificacao = conteudoNotificacao;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obt�m o identificar �nico de morada.
        /// </summary>
        public int IdNotificacao
        {
            get { return idNotificacao; }
        }

        /// <summary>
        /// Obt�m ou define a freguesia.
        /// </summary>
        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        /// <summary>
        /// Obt�m ou define a cidade.
        /// </summary>
        public int IdPagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        /// <summary>
        /// Obt�m ou define a rua.
        /// </summary>
        public int IdPost
        {
            get { return idPost; }
            set { idPost = value; }
        }

        /// <summary>
        /// Obt�m ou define o c�digo postal.
        /// </summary>
        public int IdTicket
        {
            get { return idTicket; }
            set { idTicket = value; }
        }

        public int IdVotacao
        {
            get { return idVotacao; }
            set { idVotacao = value; }
        }

        public tipoNotificacao TipoNotificacao
        {
            get { return tipoNotificacao; }
            set { tipoNotificacao = value; }
        }

        public string ConteudoNotificacao
        {
            get { return conteudoNotificacao; }
            set { conteudoNotificacao = value; }
        }
        #endregion


        #endregion
    }
}