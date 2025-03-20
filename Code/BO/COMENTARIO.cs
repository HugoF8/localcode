/*
*	<copyright file="COMENTARIO" company="LocalCode"> </copyright> 
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
    /// <summary>
    /// Classe base que representa um comentário.
    /// </summary>
    public class Comentario
    {
        #region Atributos

        int idComentario;
        int idPost;
        int idUtilizador;
        string conteudoComentario;
        DateTime dataComentario;
        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão.

        /// </summary>
        public Comentario()
        {
            this.idComentario = 0;
            this.idPost = 0;
            this.idUtilizador = 0;
            this.conteudoComentario = "";
            this.dataComentario = DateTime.Now;
        }

        /// <summary>
        /// Construtor por parametros
        /// </summary>
        /// <param name="IDcomentario"></param>
        /// <param name="IDpost"></param>
        /// <param name="IDutilizador"></param>
        /// <param name="conteudoComentario"></param>
        /// <param name="dataComentario"></param>
        public Comentario(int idComentario, int idPost, int idUtilizador, string conteudoComentario, DateTime dataComentario)
        {
            this.idComentario = idComentario;
            this.idPost = idPost;
            this.idUtilizador = idUtilizador;
            this.conteudoComentario = conteudoComentario;
            this.dataComentario = dataComentario;
        }
        #endregion

        #region Propriedades

        /// <summary>
        /// Obtém ou define o nome da pessoa.
        /// </summary>
        public int IdComentario
        {
            get { return idComentario; }
        }

        public int IdPost
        {
            get { return idPost; }
            set { idPost = value; }
        }

        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        public string ConteudoComentario
        {
            get { return conteudoComentario; }
            set { conteudoComentario = value; }
        }

        public DateTime DataComentario
        {
            get { return dataComentario; }
            set { dataComentario = value; }
        }


        #endregion

        #region Operadores

       
        #endregion

        #region Overrides

        
        #endregion


        #endregion
    }
}