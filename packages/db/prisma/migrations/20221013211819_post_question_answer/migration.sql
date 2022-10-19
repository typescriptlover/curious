-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "attachments" TEXT[],
    "byId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "byId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "byId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "answers_questionId_key" ON "answers"("questionId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_byId_fkey" FOREIGN KEY ("byId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_byId_fkey" FOREIGN KEY ("byId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_byId_fkey" FOREIGN KEY ("byId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
