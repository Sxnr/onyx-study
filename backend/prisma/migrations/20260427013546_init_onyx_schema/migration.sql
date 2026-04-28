-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena_hasheada" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL,
    "propietario_id" TEXT NOT NULL,
    "es_publico" BOOLEAN NOT NULL DEFAULT false,
    "URL_archivo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "etiquetas" TEXT[],

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desafio" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel_dificultad" TEXT NOT NULL,
    "codigo_inicial" TEXT NOT NULL,
    "casos_prueba" JSONB NOT NULL,

    CONSTRAINT "Desafio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progreso" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "desafio_id" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "fecha_completado" TIMESTAMP(3),

    CONSTRAINT "Progreso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Progreso_usuario_id_desafio_id_key" ON "Progreso"("usuario_id", "desafio_id");

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progreso" ADD CONSTRAINT "Progreso_desafio_id_fkey" FOREIGN KEY ("desafio_id") REFERENCES "Desafio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
