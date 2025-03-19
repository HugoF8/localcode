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
            this.dataComentario = "";
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

        /// <summary>
        /// Compara duas pessoas para igualdade com base em seus atributos.
        /// </summary>
        public static bool operator ==(Pessoa p1, Pessoa p2)
        {
            if ((p1.nome == p2.nome) && (p1.apelido == p2.apelido) && (p1.idade == p2.idade) && (p1.NIF == p2.NIF) && (p1.SNS == p2.SNS))
                return true;
            return false;
        }

        /// <summary>
        /// Compara duas pessoas para desigualdade com base em seus atributos.
        /// </summary>
        public static bool operator !=(Pessoa p1, Pessoa p2)
        {
            return !(p1 == p2);
        }
        #endregion

        #region Overrides

        /// <summary>
        /// Retorna uma representação em string da pessoa.
        /// </summary>
        public override string ToString()
        {
            return String.Format("Nome: {0} {1} - Idade: {2} - NIF: {3} - SNS: {4}", nome, apelido, idade.ToString(), NIF.ToString(), SNS.ToString());
        }

        /// <summary>
        /// Determina se a pessoa é igual a outro objeto.
        /// </summary>
        public override bool Equals(object obj)
        {
            if (obj is Pessoa)
            {
                Pessoa p = (Pessoa)obj;
                if (this == p)
                {
                    return true;
                }
            }
            return false;
        }




        #endregion


        #endregion
    }
}