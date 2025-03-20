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
    enum funcaoModerador
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
        Enum funcaoModerador;
        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão.

        /// </summary>
        //public ModeradorPagina()
        //{
        //    this.idmoderador = 0;
        //    this.idpagina = 0;
        //    this.idutilizador = 0;
        //    this.funcao_moderador = null; 
        //}

        
        public MODERADORPAGINA(int idModerador, int idPagina, int idUtilizador, Enum funcaoModerador)
        {
            this.idModerador = idModerador;
            this.idPagina = idPagina;
            this.idUtilizador = idUtilizador;
            this.funcaoModerador = null;
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

        #region Operadores

        #endregion

        #region Overrides

        /// <summary>
        /// Retorna uma representação em string da pessoa.
        /// </summary>






        #endregion


        #endregion
    }
}