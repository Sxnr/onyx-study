/*
  Warnings:

  - You are about to drop the column `URL_archivo` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `es_publico` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `etiquetas` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `propietario_id` on the `Documento` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Documento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_propietario_id_fkey";

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "URL_archivo",
DROP COLUMN "es_publico",
DROP COLUMN "etiquetas",
DROP COLUMN "propietario_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "esPublico" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
