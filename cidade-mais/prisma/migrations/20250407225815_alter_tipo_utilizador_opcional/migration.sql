/*
  Warnings:

  - Made the column `nome` on table `utilizador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `utilizador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `utilizador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_nascimento` on table `utilizador` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "utilizador" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "data_nascimento" SET NOT NULL,
ALTER COLUMN "tipo_utilizador" DROP NOT NULL;
