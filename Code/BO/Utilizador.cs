/*
*	<copyright file="Utilizador" company="LocalCode"> </copyright> 
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
    // Tipos de Utilizador
    enum tipoUtilizadores
    {
        Administrador,
        Moderador,
        Utilizador
    };

    /// <summary>
    /// Classe base que representa um utilizador.
    /// </summary>
    public class Utilizador
    {
        #region Atributos

        int idUtilizador;
        int idMorada;
        string nome;
        string email;
        string password;
        DateTime dataNascimento;
        int contacto;
        tipoUtilizadores tipoUtilizador;

        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão para utilizador
        /// </summary>
        public Utilizador()
        {
            this.idUtilizador = 0;
            this.idMorada = 0;
            this.nome = "";
            this.email = "";
            this.password = "";
            this.dataNascimento = DateTime.MinValue;
            this.contacto = 0;
            this.tipoUtilizador = "Utilizador";
        }

        /// <summary>
        /// Construtor por parametros para utilizador
        /// </summary>
        /// <param name="idUtilizador"></param>
        /// <param name="idMorada"></param>
        /// <param name="nome"></param>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="dataNascimento"></param>
        /// <param name="contacto"></param>
        /// <param name="tipoUtilizador"></param>
        public Pessoa(int idUtilizador, int idMorada, string nome, string email, string password, DateTime dataNascimento, int contacto, tipoUtilizadores tipoUtilizador)
        {
            this.idUtilizador = idUtilizador;
            this.idMorada = idMorada;
            this.nome = nome;
            this.email = email;
            this.password = password;
            this.dataNascimento = dataNascimento;
            this.contacto = contacto;
            this.tipoUtilizador = tipoUtilizador;
        }

        #endregion

        #region Propriedades

        /// <summary>
        /// Obtém o identificar único de utilizador.
        /// </summary>
        public int IdUtilizador
        {
            get { return idUtilizador; }
        }

        /// <summary>
        /// Obtém ou define identificar único de morada.
        /// </summary>
        public int IdMorada
        {
            get { return idMorada; }
            set { idMorada = value; }
        }

        /// <summary>
        /// Obtém ou define o nome do utilizador.
        /// </summary>
        public string Nome
        {
            get { return nome; }
            set { nome = value; }
        }

        /// <summary>
        /// Obtém ou define o email do utilizador.
        /// </summary>
        public string Email
        {
            get { return email; }
            set { email = value; }
        }

        /// <summary>
        /// Obtém ou define a password do utilizador.
        /// </summary>
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        /// <summary>
        /// Obtém ou define a data de nascimento do utilizador.
        /// </summary>
        public DateTime DataNascimento
        {
            get { return dataNascimento; }
            set { dataNascimento = value; }
        }

        /// <summary>
        /// Obtém ou define o contacto do utilizador.
        /// </summary>
        public int Contacto
        {
            get { return contacto; }
            set { contacto = value; }
        }

        /// <summary>
        /// Obtém ou define o tipo de utilizador.
        /// </summary>
        public tipoUtilizadores TipoUtilizador
        {
            get { return tipoUtilizador; }
            set { tipoUtilizador = value; }
        }


        #endregion


        #endregion
    }
}



