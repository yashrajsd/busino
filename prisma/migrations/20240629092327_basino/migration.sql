-- DropForeignKey
ALTER TABLE "MineGame" DROP CONSTRAINT "MineGame_gameId_fkey";

-- AddForeignKey
ALTER TABLE "MineGame" ADD CONSTRAINT "MineGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
