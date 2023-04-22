-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orgao_id" INTEGER NOT NULL,
    "first_access" BOOLEAN NOT NULL DEFAULT true,
    "token_recuperar_password" TEXT,
    "roles" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Situacao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Situacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orgao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Orgao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viatura" (
    "id" SERIAL NOT NULL,
    "data_regsitro" TIMESTAMP(3) NOT NULL,
    "situacao_id" INTEGER NOT NULL,
    "processo_vinculacao" TEXT NOT NULL,
    "orgao_id" INTEGER NOT NULL,
    "departamento" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "chassi" TEXT NOT NULL,
    "placa_oficial" TEXT NOT NULL,
    "locado" BOOLEAN NOT NULL,
    "data_fim_locacao" TIMESTAMP(3),
    "placa_atribuida" TEXT,
    "data_atribuicao" TIMESTAMP(3),
    "doerj_atribuicao" TEXT,
    "data_validade" TIMESTAMP(3),
    "processo_revalidacao" TEXT,
    "data_expiracao" TIMESTAMP(3),
    "doerj_revalidacao" TEXT,
    "processo_desvinculacao" TEXT,
    "data_desvinculacao" TIMESTAMP(3),
    "doerj_desvinculacao" TEXT,
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Viatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Orgao_nome_key" ON "Orgao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Orgao_sigla_key" ON "Orgao"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Viatura_placa_oficial_key" ON "Viatura"("placa_oficial");

-- CreateIndex
CREATE UNIQUE INDEX "Viatura_placa_atribuida_key" ON "Viatura"("placa_atribuida");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_orgao_id_fkey" FOREIGN KEY ("orgao_id") REFERENCES "Orgao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viatura" ADD CONSTRAINT "Viatura_situacao_id_fkey" FOREIGN KEY ("situacao_id") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viatura" ADD CONSTRAINT "Viatura_orgao_id_fkey" FOREIGN KEY ("orgao_id") REFERENCES "Orgao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
