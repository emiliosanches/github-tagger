-- CreateTable
CREATE TABLE "RepositoryTag" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "repositoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RepositoryTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RepositoryTag_id_key" ON "RepositoryTag"("id");

-- AddForeignKey
ALTER TABLE "RepositoryTag" ADD CONSTRAINT "RepositoryTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
