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
    "estado_notificacao" "estado_notificacao" NOT NULL,

    CONSTRAINT "notificacao_pkey" PRIMARY KEY ("id_notificacao")
);

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_pagina_fkey" FOREIGN KEY ("id_pagina") REFERENCES "pagina_freguesia"("id_pagina") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "ticket"("id_ticket") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacao" ADD CONSTRAINT "notificacao_id_utilizador_fkey" FOREIGN KEY ("id_utilizador") REFERENCES "utilizador"("id_utilizador") ON DELETE CASCADE ON UPDATE NO ACTION;
