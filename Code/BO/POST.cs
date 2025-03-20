/*
*	<copyright file="POST" company="LocalCode"> </copyright> 
*	<author>Tiago Castro</author>
*	<contact>a25434@alunos.ipca.pt</contact>
**/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    //Tipo de Post
    public enum tiposPost
    {
        Votacao,
        Publicacao
    };

    //Estado do Post
    public enum estadosPost
    {
        Pendente,
        Recusado,
        Aceite
    };

    /// <summary>
    /// Classe base que representa um post.
    /// </summary>
    public class Post
    {
        #region Atributos

        int idPost;
        int idUtilizador;
        int idPagina;
        int aprovacoes;
        string descricaoPost;
        string mediaPost;
        tiposPost tipoPost;
        estadosPost estadoPost;
        DateTime dataPost;
        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão.

        /// </summary>
        public Post()
        {
            this.idPost = 0;
            this.idUtilizador = 0;
            this.idPagina = 0;
            this.descricaoPost = "";
            this.mediaPost = "";
            this.dataPost = DateTime.Now;
            this.tipoPost = tiposPost.Publicacao;
            this.estadoPost = estadosPost.Pendente;
        }

        /// <summary>
        /// Construtor por parametros
        /// </summary>
        /// <param name="idPost"></param>
        /// <param name="idUtilizador"></param>
        /// <param name="idPagina"></param>
        /// <param name="mediaPost"></param>
        /// <param name="dataPost"></param>
        /// <param name="tipoPost"></param>
        /// <param name="estadoPost"></param>

        public Post(int idPost, int idUtilizador, int idPagina, string descricaoPost, string mediaPost, DateTime dataPost, tiposPost tipoPost, estadosPost estadoPost)
        {
            this.idPost = idPost;
            this.idUtilizador = idUtilizador;
            this.idPagina = idPagina;
            this.descricaoPost = descricaoPost;
            this.mediaPost = mediaPost;
            this.dataPost = dataPost;
            this.tipoPost = tipoPost;
            this.estadoPost = estadoPost;
        }
        #endregion

        #region Propriedades

        /// <summary>
        /// Obtém ou define o nome da pessoa.
        /// </summary>
        public int IdPost
        {
            get { return idPost; }
        }

        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        public int IdPagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        public string DescricaoPost
        {
            get { return descricaoPost; }
            set { descricaoPost = value; }
        }

        public string MediaPost
        {
            get { return mediaPost; }
            set { mediaPost = value; }
        }

        public DateTime DataPost
        {
            get { return dataPost; }
            set { dataPost = value; }
        }

        public tiposPost TipoPost
        {
            get { return tipoPost; }
            set { tipoPost = value; }
        }

        public estadosPost EstadoPost
        {
            get { return estadoPost; }
            set { estadoPost = value; }
        }


        #endregion

        #region Operadores

       
        #endregion

        #region Overrides

        

        #endregion


        #endregion
    }
}