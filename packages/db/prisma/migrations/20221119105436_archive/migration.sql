-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "archive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "archive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "archive" BOOLEAN NOT NULL DEFAULT false;
