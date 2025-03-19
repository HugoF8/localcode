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
    /// <summary>
    /// Classe base que representa um utilizador.
    /// </summary>
    public class Utilizador
    {
        #region Atributos

        string nome;
        string apelido;
        int idade;
        int NIF;
        int SNS;
        #endregion

        #region Métodos

        #region Construtores

        /// <summary>
        /// Construtor padrão 

        /// </summary>
        public Pessoa()
        {
            nome = "";
            apelido = "";
            idade = 0;
            NIF = 0;
            SNS = 0;
        }

        /// <summary>
        /// Construtor por parametros
        /// </summary>
        /// <param name="nome"></param>
        /// <param name="apelido"></param>
        /// <param name="idade"></param>
        /// <param name="nIF"></param>
        /// <param name="sNS"></param>
        public Pessoa(string nome, string apelido, int idade, int nIF, int sNS)
        {
            this.nome = nome;
            this.apelido = apelido;
            this.idade = idade;
            NIF = nIF;
            SNS = sNS;
        }
        #endregion

        #region Propriedades

        /// <summary>
        /// Obtém ou define o nome da pessoa.
        /// </summary>
        public string Nome
        {
            get { return nome; }
            set { nome = value; }
        }


        #endregion

        #region Operadores

        /// <summary>
        /// Compara duas pessoas para igualdade com base em seus atributos.
        /// </summary>
        public static bool operator ==(Pessoa p1, Pessoa p2)
        {
            if ((p1.nome == p2.nome) && (p1.apelido == p2.apelido) && (p1.idade == p2.idade) && (p1.NIF == p2.NIF) && (p1.SNS == p2.SNS))
                return true;
            return false;
        }

        /// <summary>
        /// Compara duas pessoas para desigualdade com base em seus atributos.
        /// </summary>
        public static bool operator !=(Pessoa p1, Pessoa p2)
        {
            return !(p1 == p2);
        }
        #endregion

        #region Overrides

        /// <summary>
        /// Retorna uma representação em string da pessoa.
        /// </summary>
        public override string ToString()
        {
            return String.Format("Nome: {0} {1} - Idade: {2} - NIF: {3} - SNS: {4}", nome, apelido, idade.ToString(), NIF.ToString(), SNS.ToString());
        }

        /// <summary>
        /// Determina se a pessoa é igual a outro objeto.
        /// </summary>
        public override bool Equals(object obj)
        {
            if (obj is Pessoa)
            {
                Pessoa p = (Pessoa)obj;
                if (this == p)
                {
                    return true;
                }
            }
            return false;
        }




        #endregion


        #endregion
    }
}

