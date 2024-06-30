-- CreateTable
CREATE TABLE "mineCR" (
    "id" SERIAL NOT NULL,
    "p" DOUBLE PRECISION NOT NULL,
    "bombs" INTEGER NOT NULL,

    CONSTRAINT "mineCR_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mineCR_bombs_key" ON "mineCR"("bombs");
