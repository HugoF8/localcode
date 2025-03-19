/*
*	<copyright file="VOTO" company="LocalCode"> </copyright> 
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
    /// Classe base que representa o voto.
    /// </summary>
    public class VOTO
    {
        #region Atributos

        int idVoto;
        int idOpcao;
        int idUtilizador;
        DateTime dataVoto;

        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// Construtor padr�o para voto
        /// </summary>
        public VOTO()
        {
            this.idVoto = 0;
            this.idOpcao = 0;
            this.idUtilizador = 0;
            this.dataVoto = DateTime.MinValue;
        }

        /// <summary>
        /// Construtor por parametros para voto
        /// </summary>
        /// <param name="idVoto"></param>
        /// <param name="idOpcao"></param>
        /// <param name="idUtilizador"></param>
        /// <param name="dataVoto"></param>
        public VOTO(int idVoto, int idOpcao, int idUtilizador, DateTime dataVoto)
        {
            this.idVoto = idVoto;
            this.idOpcao = idOpcao;
            this.idUtilizador = idUtilizador;
            this.dataVoto = dataVoto;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obt�m o identificar �nico de voto.
        /// </summary>
        public int IdVoto
        {
            get { return idVoto; }
        }

        /// <summary>
        /// Obt�m ou define o identificador �nico da op��o.
        /// </summary>
        public int IdOpcao
        {
            get { return idOpcao; }
            set { idOpcao = value; }
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
        /// Obt�m ou define a data do voto.
        /// </summary>
        public DateTime DataVoto
        {
            get { return dataVoto; }
            set { dataVoto = value; }
        }


        #endregion


        #endregion
    }
}