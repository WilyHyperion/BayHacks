-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "classId" TEXT;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
