/*
  Warnings:

  - You are about to drop the column `type` on the `places` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,type_id]` on the table `places` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type_id` to the `places` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "places" DROP COLUMN "type",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TypeOfPlace";

-- CreateTable
CREATE TABLE "types_of_places" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_of_places_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "places_name_type_id_key" ON "places"("name", "type_id");

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types_of_places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
