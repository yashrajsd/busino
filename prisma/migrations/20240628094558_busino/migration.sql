-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "endedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GameSession" ALTER COLUMN "endedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MineGame" ADD COLUMN     "clickedMine" BOOLEAN[];
