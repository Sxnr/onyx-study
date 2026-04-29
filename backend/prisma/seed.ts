import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// 1. Configuración del adaptador (igual que en tu prisma.ts)
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Inicializamos con el adaptador
const prisma = new PrismaClient({ adapter });

declare const process: any;

const recursosBase = [
  { titulo: "MDN Web Docs", descripcion: "La biblia del desarrollo web. Documentación exhaustiva sobre HTML, CSS y JavaScript.", url: "https://developer.mozilla.org/es/", categoria: "Documentación", lenguaje: "JavaScript" },
  { titulo: "Java 17 API Specification", descripcion: "Documentación oficial de Oracle para todas las clases y paquetes de Java Standard Edition 17.", url: "https://docs.oracle.com/en/java/javase/17/docs/api/index.html", categoria: "Documentación", lenguaje: "Java" },
  { titulo: "Python 3 Official Docs", descripcion: "Manual de referencia oficial, tutoriales y guías de la biblioteca estándar de Python.", url: "https://docs.python.org/3/", categoria: "Documentación", lenguaje: "Python" },
  { titulo: "C++ Reference", descripcion: "Referencia técnica completa para el lenguaje C++ y su Standard Template Library (STL).", url: "https://en.cppreference.com/w/", categoria: "Documentación", lenguaje: "C++" },
  { titulo: "Dart Language Tour", descripcion: "Guía completa de la sintaxis y características del lenguaje Dart.", url: "https://dart.dev/language", categoria: "Documentación", lenguaje: "Dart" },
  { titulo: "PostgreSQL Documentation", descripcion: "Guía oficial del motor de base de datos relacional más avanzado del mundo.", url: "https://www.postgresql.org/docs/", categoria: "Documentación", lenguaje: "SQL" },
  { titulo: "React.js Oficial", descripcion: "La biblioteca para interfaces de usuario web interactivas.", url: "https://react.dev/", categoria: "Librería", lenguaje: "JavaScript" },
  { titulo: "Express.js Guide", descripcion: "Framework web rápido, minimalista y flexible para Node.js.", url: "https://expressjs.com/", categoria: "Librería", lenguaje: "JavaScript" },
  { titulo: "Prisma ORM", descripcion: "El ORM de nueva generación para Node.js y TypeScript.", url: "https://www.prisma.io/docs", categoria: "Librería", lenguaje: "TypeScript" },
  { titulo: "Spring Boot Reference", descripcion: "El framework líder para construir aplicaciones empresariales en Java.", url: "https://spring.io/projects/spring-boot", categoria: "Librería", lenguaje: "Java" },
  { titulo: "Pandas", descripcion: "Herramienta de análisis y manipulación de datos rápida, potente y flexible en Python.", url: "https://pandas.pydata.org/docs/", categoria: "Librería", lenguaje: "Python" },
  { titulo: "Flutter", descripcion: "Framework de UI de Google para crear apps multiplataforma nativas desde una sola base de código.", url: "https://docs.flutter.dev/", categoria: "Librería", lenguaje: "Dart" },
  { titulo: "Roadmap.sh", descripcion: "Rutas de aprendizaje interactivas, guías y hojas de ruta para desarrolladores.", url: "https://roadmap.sh/", categoria: "Curso", lenguaje: "General" },
  { titulo: "CS50 de Harvard", descripcion: "Introducción a las ciencias de la computación y al arte de la programación.", url: "https://cs50.harvard.edu/x/", categoria: "Curso", lenguaje: "General" },
  { titulo: "Exercism", descripcion: "Aprende y domina la programación resolviendo ejercicios en más de 60 lenguajes.", url: "https://exercism.org/", categoria: "Curso", lenguaje: "General" },
  { titulo: "FreeCodeCamp", descripcion: "Organización sin fines de lucro con miles de horas de tutoriales interactivos de código gratis.", url: "https://www.freecodecamp.org/espanol/", categoria: "Curso", lenguaje: "JavaScript" },
  { titulo: "Git Book", descripcion: "Todo lo que necesitas saber sobre el sistema de control de versiones Git.", url: "https://git-scm.com/book/es/v2", categoria: "Documentación", lenguaje: "General" },
  { titulo: "Regex101", descripcion: "Herramienta para crear, probar y depurar Expresiones Regulares con explicaciones paso a paso.", url: "https://regex101.com/", categoria: "Herramienta", lenguaje: "General" },
  { titulo: "JSONPlaceholder", descripcion: "API REST falsa y gratuita para pruebas y prototipos.", url: "https://jsonplaceholder.typicode.com/", categoria: "Herramienta", lenguaje: "General" },
  { titulo: "Tailwind CSS Components", descripcion: "Referencia y ejemplos de clases de utilidad para Tailwind CSS.", url: "https://tailwindcss.com/docs", categoria: "Documentación", lenguaje: "CSS" }
];

async function main() {
  console.log('Iniciando carga de semilla en la Biblioteca...');
  
  // Limpiamos la tabla antes de insertar para evitar duplicados si lo corres dos veces
  await prisma.recursoPublico.deleteMany({});
  
  for (const recurso of recursosBase) {
    await prisma.recursoPublico.create({
      data: recurso
    });
  }
  
  console.log('✅ ¡20 Recursos inyectados exitosamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });