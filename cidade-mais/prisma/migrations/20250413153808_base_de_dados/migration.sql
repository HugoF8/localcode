-- CreateEnum
CREATE TYPE "estado_notificacao" AS ENUM ('lida', 'nao lida');

-- CreateEnum
CREATE TYPE "estado_pedido" AS ENUM ('pendente', 'aprovado', 'reprovado');

-- CreateEnum
CREATE TYPE "estado_post" AS ENUM ('ativo', 'inativo', 'pendente');

-- CreateEnum
CREATE TYPE "estado_resposta" AS ENUM ('resolvido', 'nao resolvido');

-- CreateEnum
CREATE TYPE "estado_ticket" AS ENUM ('aberto', 'fechado', 'pendente');

-- CreateEnum
CREATE TYPE "estado_votacao" AS ENUM ('ativo', 'encerrado');

-- CreateEnum
CREATE TYPE "funcao_moderador" AS ENUM ('dono', 'moderador');

-- CreateEnum
CREATE TYPE "tipo_notificacao" AS ENUM ('Aprovado', 'Recusado', 'Validacao', 'Verificacao', 'Sucesso', 'Insucesso');

-- CreateEnum
CREATE TYPE "tipo_utilizador" AS ENUM ('admin', 'moderador', 'utilizador');

-- CreateTable
CREATE TABLE "comentario" (
    "id_comentario" SERIAL NOT NULL,
    "id_post" INTEGER NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "conteudo_comentario" TEXT NOT NULL,
    "data_comentario" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id_comentario")
);

-- CreateTable
CREATE TABLE "moderador_pagina" (
    "id_moderador" SERIAL NOT NULL,
    "id_pagina" INTEGER,
    "id_utilizador" INTEGER,
    "funcao" "funcao_moderador" NOT NULL,

    CONSTRAINT "moderador_pagina_pkey" PRIMARY KEY ("id_moderador")
);

-- CreateTable
CREATE TABLE "morada" (
    "id_morada" SERIAL NOT NULL,
    "freguesia" VARCHAR(255),
    "cidade" VARCHAR(255) NOT NULL,
    "rua" VARCHAR(255),
    "codigo_postal" INTEGER NOT NULL,

    CONSTRAINT "morada_pkey" PRIMARY KEY ("id_morada")
);

-- CreateTable
CREATE TABLE "notificacao" (
    "id_notificacao" SERIAL NOT NULL,
    "id_utilizador" INTEGER,
    "id_pagina" INTEGER,
    "tipo_notificacao" "tipo_notificacao" NOT NULL,
    "id_post" INTEGER,
    "id_ticket" INTEGER,
    "data" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "conteudo_notificacao" TEXT,
    "estado_notificacao" "estado_notificacao" NOT NULL DEFAULT 'nao lida',

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id_notificacao")
);

-- CreateTable
CREATE TABLE "pagina_freguesia" (
    "id_pagina" SERIAL NOT NULL,
    "id_morada" INTEGER NOT NULL,
    "id_utilizador" INTEGER,
    "nome_pagina" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "foto_perfil" VARCHAR(255),
    "foto_capa" VARCHAR(255),

    CONSTRAINT "pagina_freguesia_pkey" PRIMARY KEY ("id_pagina")
);

-- CreateTable
CREATE TABLE "pedido_pagina" (
    "id_pedido" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "id_morada" INTEGER NOT NULL,
    "dados_comprovacao" TEXT NOT NULL,
    "estado_pedido" "estado_pedido" NOT NULL DEFAULT 'pendente',
    "data_pedido" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "nomefreguesia" VARCHAR(255) NOT NULL,

    CONSTRAINT "pedido_pagina_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id_perfil" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "foto_perfil" VARCHAR(255),
    "foto_capa" VARCHAR(255),
    "biografia" VARCHAR(255),

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id_perfil")
);

-- CreateTable
CREATE TABLE "post" (
    "id_post" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "id_pagina" INTEGER NOT NULL,
    "descricao_post" TEXT,
    "media_post" VARCHAR(255),
    "estado_post" "estado_post" NOT NULL DEFAULT 'pendente',
    "aprovacoes" INTEGER DEFAULT 0,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id_post")
);

-- CreateTable
CREATE TABLE "resposta_ticket" (
    "id_resposta" SERIAL NOT NULL,
    "id_ticket" INTEGER NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "data_resposta" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "conteudo_resposta" TEXT,
    "estado_resposta" "estado_resposta" NOT NULL,

    CONSTRAINT "resposta_ticket_pkey" PRIMARY KEY ("id_resposta")
);

-- CreateTable
CREATE TABLE "seguidores_pagina" (
    "id_seguimento" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "id_pagina" INTEGER NOT NULL,
    "data_seguimento" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "seguidores_pagina_pkey" PRIMARY KEY ("id_seguimento")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id_ticket" SERIAL NOT NULL,
    "id_utilizador" INTEGER NOT NULL,
    "id_pagina" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "descricao_problema" TEXT NOT NULL,
    "estado_ticket" "estado_ticket" NOT NULL DEFAULT 'pendente',

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id_ticket")
);

-- CreateTable
CREATE TABLE "utilizador" (
    "id_utilizador" SERIAL NOT NULL,
    "id_morada" INTEGER,
    "nome" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "contacto" VARCHAR(20),
    "tipo_utilizador" "tipo_utilizador" NOT NULL DEFAULT 'utilizador',

    CONSTRAINT "utilizador_pkey" PRIMARY KEY ("id_utilizador")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilizador_email_key" ON "utilizador"("email");

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "moderador_pagina" ADD CONSTRAINT "moderador_pagina_id_pagina_fkey" FOREIGN KEY ("id_pagina") REFERENCES "pagina_freguesia"("id_pagina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "moderador_pagina" ADD CONSTRAINT "moderador_pagina_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_pagina_fkey" FOREIGN KEY ("id_pagina") REFERENCES "pagina_freguesia"("id_pagina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "ticket"("id_ticket") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagina_freguesia" ADD CONSTRAINT "pagina_freguesia_id_morada_fkey" FOREIGN KEY ("id_morada") REFERENCES "morada"("id_morada") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagina_freguesia" ADD CONSTRAINT "pagina_freguesia_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedido_pagina" ADD CONSTRAINT "pedido_pagina_id_morada_fkey" FOREIGN KEY ("id_morada") REFERENCES "morada"("id_morada") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedido_pagina" ADD CONSTRAINT "pedido_pagina_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perfil" ADD CONSTRAINT "perfil_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_id_pagina_fkey" FOREIGN KEY ("id_pagina") REFERENCES "pagina_freguesia"("id_pagina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resposta_ticket" ADD CONSTRAINT "resposta_ticket_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "ticket"("id_ticket") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resposta_ticket" ADD CONSTRAINT "resposta_ticket_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguidores_pagina" ADD CONSTRAINT "seguidores_pagina_id_pagina_fkey" FOREIGN KEY ("id_pagina") REFERENCES "pagina_freguesia"("id_pagina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seguidores_pagina" ADD CONSTRAINT "seguidores_pagina_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_pagina_fkey" FOREIGN KEY ("id_pagina") REFERENCES "pagina_freguesia"("id_pagina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "utilizador" ADD CONSTRAINT "utilizador_id_morada_fkey" FOREIGN KEY ("id_morada") REFERENCES "morada"("id_morada") ON DELETE SET NULL ON UPDATE NO ACTION;
