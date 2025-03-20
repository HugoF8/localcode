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
    /// Classe base que representa a opção de voto.
    /// </summary>
    public class OPCAOVOTO
    {
        #region Atributos

        int idOpcao;
        int idVotacao;
        string descricaoOpcao;

        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão para opção de voto
        /// </summary>
        public OPCAOVOTO()
        {
            this.idOpcao = 0;
            this.idVotacao = 0;
            this.descricaoOpcao = "";
        }

        /// <summary>
        /// Construtor por parametros para opção de voto
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
        /// Obtém o identificar único de opção de voto.
        /// </summary>
        public int IdOpcao
        {
            get { return idOpcao; }
        }

        /// <summary>
        /// Obtém ou define o identificador único da votação.
        /// </summary>
        public int IdVotacao
        {
            get { return idVotacao; }
            set { idVotacao = value; }
        }

        /// <summary>
        /// Obtém ou define a descrição da opção.
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