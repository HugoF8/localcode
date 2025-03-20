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
    enum funcao_moderador
    {
        dono,
        moderador,
    }
    /// <summary>
    /// Classe base que representa um comentário.
    /// </summary>
    public class ModeradorPagina
    {
        #region Atributos
        int idmoderador;
        int idpagina;
        int idutilizador;
        Enum funcao_moderador;
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

        public ModeradorPagina(int idmoderador, int idpagina, int idutilizador, Enum funcao_moderador)
        {
            this.idmoderador = idmoderador;
            this.idpagina = idpagina;
            this.idutilizador = idutilizador;
            this.funcao_moderador = null;
        }

        #endregion

        #region Propriedades

        public int Idmoderador 
        {
            get { return idmoderador; }
        }

        public int Idpagina
        {
            get { return idpagina; }
        }

        public int Idutilizador
        {
            get { return idutilizador; }
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