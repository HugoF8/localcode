/*
*	<copyright file="RESPOSTATICKET" company="LocalCode"> </copyright> 
*	<author>Gonçalo Figueiredo</author>
*	<contact>a26747@alunos.ipca.pt</contact>
**/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    //Tipos de ticket
    enum estadosResposta
    {
        Pendente,
        Recusado,
        Aceite
    }
    /// <summary>
    /// Classe base que representa um utilizador.
    /// </summary>
    public class RESPOSTATICKET
    {
        #region Atributos

        int idResposta;
        int idTicket;
        int idUtilizador;
        DateTime dataResposta;
        string descricaoResposta;
        estadosResposta estadoResposta;

        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor por parametros
        /// </summary>
        /// <param name="nome"></param>
        /// <param name="apelido"></param>
        /// <param name="idade"></param>
        /// <param name="nIF"></param>
        /// <param name="sNS"></param>
        /// 
        public RESPOSTATICKET(int idResposta, int idTicket, int idUtilizador, DateTime dataResposta, string descricaoResposta, estadosResposta estadoResposta)
        {
            this.idResposta = idResposta;
            this.idTicket = idTicket;
            this.idUtilizador = idUtilizador;
            this.dataResposta = dataResposta;
            this.descricaoResposta = descricaoResposta;
            this.estadoResposta = estadoResposta;
        }
        #endregion

        #region Propriedades

        /// <summary>
        /// Obtém e define.
        /// </summary>
        public int IDresposta
        {
            get { return idResposta; }
            set { idResposta = value; }
        }

        public int IDticket
        {
            get { return idTicket; }
            set { idUtilizador = value; }
        }

        public int IDutilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        public DateTime DataResposta
        {
            get { return dataResposta; }
            set { dataResposta = value; }
        }

        public string DescricaoResposta
        {
            get { return descricaoResposta; }
            set { descricaoResposta = value; }
        }

        public estadosResposta EstadoResposta
        {
            get { return estadoResposta; }
            set { estadoResposta = value; }
        }

        #endregion

        #region Operadores


        #endregion


        #endregion
    }
}