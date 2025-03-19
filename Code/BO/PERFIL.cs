/*
*	<copyright file="PERFIL" company="LocalCode"> </copyright> 
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
    /// Classe base que representa um perfil do utilizador.
    /// </summary>
    public class PERFIL
    {
        #region Atributos

        int idPerfil;
        int idUtilizador;
        string fotoPerfil;
        string fotoCapa;
        string biografia;

        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// Construtor padr�o para perfil
        /// </summary>
        public PERFIL()
        {
            this.idPerfil = 0;
            this.idUtilizador = 0;
            this.fotoPerfil = "";
            this.fotoCapa = "";
            this.biografia = "";
        }

        /// <summary>
        /// Construtor por parametros para perfil
        /// </summary>
        /// <param name="idPerfil"></param>
        /// <param name="idUtilizador"></param>
        /// <param name="fotoPerfil"></param>
        /// <param name="fotoCapa"></param>
        /// <param name="biografia"></param>
        public PERFIL(int idPerfil, int idUtilizador, string fotoPerfil, string fotoCapa, string biografia)
        {
            this.idPerfil = idPerfil;
            this.idUtilizador = idUtilizador;
            this.fotoPerfil = fotoPerfil;
            this.fotoCapa = fotoCapa;
            this.biografia = biografia;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obt�m o identificar �nico de perfil.
        /// </summary>
        public int IdPerfil
        {
            get { return idPerfil; }
        }

        /// <summary>
        /// Obt�m ou define identificar �nico de utilizador.
        /// </summary>
        public int IdUtilizador
        {
            get { return idUtilizador; }
        }

        /// <summary>
        /// Obt�m ou define a foto de perfil.
        /// </summary>
        public string FotoPerfil
        {
            get { return fotoPerfil; }
            set { fotoPerfil = value; }
        }

        /// <summary>
        /// Obt�m ou define a foto de capa do perfil.
        /// </summary>
        public string FotoCapa
        {
            get { return fotoCapa; }
            set { fotoCapa = value; }
        }

        /// <summary>
        /// Obt�m ou define a biografia do perfil.
        /// </summary>
        public string Biografia
        {
            get { return biografia; }
            set { biografia = value; }
        }


        #endregion


        #endregion
    }
}