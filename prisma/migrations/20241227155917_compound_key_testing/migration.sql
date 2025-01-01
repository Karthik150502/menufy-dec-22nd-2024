-- CreateTable
CREATE TABLE "TestingM" (
    "userId" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TestingM_pkey" PRIMARY KEY ("userId","id")
);

-- AddForeignKey
ALTER TABLE "TestingM" ADD CONSTRAINT "TestingM_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
