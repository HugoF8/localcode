using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public enum funcoesModerador
    {
        dono,
        moderador,
    }

    /// <summary>
    /// Classe base que representa um comentário.
    /// </summary>
    public class MODERADORPAGINA
    {
        #region Atributos

        int idModerador;
        int idPagina;
        int idUtilizador;
        funcoesModerador funcaoModerador;

        #endregion

        #region Métodos

        #region Construtores

        ///<summary>
        /// Construtor padrão.
        /// </summary>
        public MODERADORPAGINA()
        {
            this.idModerador = 0;
            this.idPagina = 0;
            this.idUtilizador = 0;
            this.funcaoModerador = funcoesModerador.moderador; 
        }

        
        public MODERADORPAGINA(int idModerador, int idPagina, int idUtilizador, funcoesModerador funcaoModerador)
        {
            this.idModerador = idModerador;
            this.idPagina = idPagina;
            this.idUtilizador = idUtilizador;
            this.funcaoModerador = funcaoModerador;
        }

        #endregion

        #region Propriedades

        public int Idmoderador 
        {
            get { return idModerador; }
           
        }

        public int Idpagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        public int Idutilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }




        #endregion

        #endregion
    }
}