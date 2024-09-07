-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "classID" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "Id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
