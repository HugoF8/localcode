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
    public class PAGINAFREGUESIA
    {
        #region Atributos

        int idPagina;
        int idUtilizador;
        string nomePagina;
        string descricao;
        string fotoPerfil;
        string fotoCapa;
        
        #endregion

        #region M�todos

        #region Construtores

        /// <summary>
        /// 
        /// </summary>
        public PAGINAFREGUESIA()
        {
            this.idPagina = 0; 
            this.idUtilizador = 0;
            this.nomePagina = "";
            this.descricao = "";
            this.fotoPerfil = "";
            this.fotoCapa = "";
        }
        
        public PAGINAFREGUESIA(int idPagina, int idUtilizador, string nomePagina, string descricao, string fotoPerfil, string fotoCapa)
        {
            this.idPagina = idPagina;
            this.idUtilizador = idUtilizador;
            this.nomePagina = nomePagina;
            this.descricao = descricao;
            this.fotoPerfil = fotoPerfil;
            this.fotoCapa = fotoCapa;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// 
        /// </summary>
        public int IdPagina
        {
            get { return idPagina; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int IdUtilizador
        {
            get { return idUtilizador; }
            set { idUtilizador = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string NomePagina
        {
            get { return nomePagina; }
            set { nomePagina = value; }
        }

        public string Descricao
        {
            get { return descricao; }
            set { descricao = value; }
        }

        public string FotoPerfil
        {
            get { return fotoPerfil; } 
            set { fotoPerfil = value; }
        }

        public string FotoCapa
        {
            get { return fotoCapa; }
            set { fotoCapa = value; }
        }


        #endregion


        #endregion
    }
}