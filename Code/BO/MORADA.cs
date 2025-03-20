/*
*	<copyright file="MORADA" company="LocalCode"> </copyright> 
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

    /// <summary>
    /// Classe base que representa a morada do utilizador.
    /// </summary>
    public class MORADA
    {
        #region Atributos

        int idMorada;
        string freguesia;
        string cidade;
        string rua;
        int codigoPostal;

        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// Construtor padr�o para morada
        /// </summary>
        public MORADA()
        {
            this.idMorada = 0;
            this.freguesia = "";
            this.cidade = "";
            this.rua = "";
            this.codigoPostal = 0;
        }

        /// <summary>
        /// Construtor por parametros para morada
        /// </summary>
        /// <param name="idMorada"></param>
        /// <param name="freguesia"></param>
        /// <param name="cidade"></param>
        /// <param name="rua"></param>
        /// <param name="codigoPostal"></param>
        public MORADA(int idMorada, string freguesia, string cidade, string rua, int codigoPostal)
        {
            this.idMorada = idMorada;
            this.freguesia = freguesia;
            this.cidade = cidade;
            this.rua = rua;
            this.codigoPostal = codigoPostal;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obt�m o identificar �nico de morada.
        /// </summary>
        public int IdMorada
        {
            get { return idMorada; }
        }

        /// <summary>
        /// Obt�m ou define a freguesia.
        /// </summary>
        public string Freguesia
        {
            get { return freguesia; }
            set { freguesia = value; }
        }

        /// <summary>
        /// Obt�m ou define a cidade.
        /// </summary>
        public string Cidade
        {
            get { return cidade; }
            set { cidade = value; }
        }

        /// <summary>
        /// Obt�m ou define a rua.
        /// </summary>
        public string Rua
        {
            get { return rua; }
            set { rua = value; }
        }

        /// <summary>
        /// Obt�m ou define o c�digo postal.
        /// </summary>
        public int CodigoPostal
        {
            get { return codigoPostal; }
            set { codigoPostal = value; }
        }


        #endregion


        #endregion
    }
}