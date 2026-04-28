import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'; // Asegura que lea tu archivo .env

// 1. Creamos la conexión directa con la base de datos
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });

// 2. Creamos el adaptador que Prisma está exigiendo
const adapter = new PrismaPg(pool);

// 3. Le pasamos el adaptador al constructor
export const prisma = new PrismaClient({ adapter });