using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    /// <summary>
    /// 
    /// </summary>
    public class SEGUIDORESPAGINA
    {
        #region Atributos

        int idSeguimento;
        int idPagina;
        int idUtilizador;
        DateTime dataSeguimento;
        
        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// 
        /// </summary>
        public SEGUIDORESPAGINA()
        {
            this.idSeguimento = 0;
            this.idPagina = 0;
            this.idUtilizador = 0;
            this.dataSeguimento = DateTime.Now;
        }
        
        public SEGUIDORESPAGINA(int idSeguimento, int idPagina, int idUtilizador, DateTime dataSeguimento)
        {
            this.idSeguimento = idSeguimento;
            this.idPagina = idPagina;
            this.idUtilizador = idUtilizador;
            this.dataSeguimento = dataSeguimento;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// 
        /// </summary>
        public int IdSeguimento
        {
            get { return idSeguimento; }
        }

        public int IdPagina
        {
            get { return idPagina; }
            set { idPagina = value; }
        }

        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        public DateTime DataSeguimento
        {
            get { return dataSeguimento; }
            set { dataSeguimento = value; }
        }

        #endregion


        #endregion
    }
}