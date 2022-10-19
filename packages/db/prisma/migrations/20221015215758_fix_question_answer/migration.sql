/*
  Warnings:

  - Added the required column `toId` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "toId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "toId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_toId_fkey" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_toId_fkey" FOREIGN KEY ("toId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
