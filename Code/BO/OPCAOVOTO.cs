/*
*	<copyright file="OPCAOVOTO" company="LocalCode"> </copyright> 
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
    /// Classe base que representa a op��o de voto.
    /// </summary>
    public class OPCAOVOTO
    {
        #region Atributos

        int idOpcao;
        int idVotacao;
        string descricaoOpcao;

        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// Construtor padr�o para op��o de voto
        /// </summary>
        public OPCAOVOTO()
        {
            this.idOpcao = 0;
            this.idVotacao = 0;
            this.descricaoOpcao = "";
        }

        /// <summary>
        /// Construtor por parametros para op��o de voto
        /// </summary>
        /// <param name="idOpcao"></param>
        /// <param name="idVotacao"></param>
        /// <param name="descricaoOpcao"></param>
        public OPCAOVOTO(int idOpcao, int idVotacao, string descricaoOpcao)
        {
            this.idOpcao = idOpcao;
            this.idVotacao = idVotacao;
            this.descricaoOpcao = descricaoOpcao;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obt�m o identificar �nico de op��o de voto.
        /// </summary>
        public int IdOpcao
        {
            get { return idOpcao; }
        }

        /// <summary>
        /// Obt�m ou define o identificador �nico da vota��o.
        /// </summary>
        public int IdVotacao
        {
            get { return idVotacao; }
            set { idVotacao = value; }
        }

        /// <summary>
        /// Obt�m ou define a descri��o da op��o.
        /// </summary>
        public string DescricaoOpcao
        {
            get { return descricaoOpcao; }
            set { descricaoOpcao = value; }
        }


        #endregion


        #endregion
    }
}