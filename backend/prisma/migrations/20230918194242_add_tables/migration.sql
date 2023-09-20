-- CreateTable
CREATE TABLE "bank" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "agencia" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "acccountNumber" INTEGER NOT NULL,
    "user_key" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "bornDate" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposits" (
    "id" TEXT NOT NULL,
    "account_key" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrows" (
    "id" TEXT NOT NULL,
    "account_key" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "withdrows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfers" (
    "id" TEXT NOT NULL,
    "user_origin_key" TEXT NOT NULL,
    "user_recipient_key" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_key_fkey" FOREIGN KEY ("user_key") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_account_key_fkey" FOREIGN KEY ("account_key") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrows" ADD CONSTRAINT "withdrows_account_key_fkey" FOREIGN KEY ("account_key") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_user_origin_key_fkey" FOREIGN KEY ("user_origin_key") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfers" ADD CONSTRAINT "transfers_user_recipient_key_fkey" FOREIGN KEY ("user_recipient_key") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
