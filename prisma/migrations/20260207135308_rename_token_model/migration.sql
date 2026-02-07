/*
  Warnings:

  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RefreshToken";

-- CreateTable
CREATE TABLE "Refreshtoken" (
    "tokenId" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Refreshtoken_pkey" PRIMARY KEY ("tokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refreshtoken_token_key" ON "Refreshtoken"("token");
