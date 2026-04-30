import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

declare const process: any;

const curriculumDesafios = [
  // --- NIVEL PRINCIPIANTE (30 Desafíos) ---
  { titulo: "P1. Hola Mundo", descripcion: "Imprime 'Onyx'.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Onyx" } },
  { titulo: "P2. Suma Básica", descripcion: "Suma 5 y 7 e imprime el resultado.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "12" } },
  { titulo: "P3. Área de un Cuadrado", descripcion: "Lado = 4. Imprime el área.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "16" } },
  { titulo: "P4. Perímetro", descripcion: "Lado = 4. Imprime el perímetro.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "16" } },
  { titulo: "P5. Mayor de Edad", descripcion: "Edad = 20. Imprime 'True' si es >= 18.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "P6. Par o Impar", descripcion: "Num = 8. Imprime 'Par'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Par" } },
  { titulo: "P7. Positivo o Negativo", descripcion: "Num = -5. Imprime 'Negativo'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Negativo" } },
  { titulo: "P8. Concatenar Strings", descripcion: "Une 'Civil ' y 'Computacion'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Civil Computacion" } },
  { titulo: "P9. Longitud de String", descripcion: "Imprime el largo de 'Santiago'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "8" } },
  { titulo: "P10. Mayúsculas", descripcion: "Convierte 'chile' a mayúsculas.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "CHILE" } },
  { titulo: "P11. Minúsculas", descripcion: "Convierte 'JAVA' a minúsculas.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "java" } },
  { titulo: "P12. Días a Horas", descripcion: "Convierte 3 días a horas.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "72" } },
  { titulo: "P13. Celsius a Fahrenheit", descripcion: "Convierte 20°C a Fahrenheit.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "68" } },
  { titulo: "P14. Calculadora de Edad", descripcion: "Año actual 2026, nacimiento 2004.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "22" } },
  { titulo: "P15. Bucle Simple", descripcion: "Imprime números del 1 al 3 (uno por línea).", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "1\n2\n3" } },
  { titulo: "P16. Macros: Proteína", descripcion: "Peso = 70kg. Calcula 2g de proteína por kg.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "140" } },
  { titulo: "P17. Macros: Volumen", descripcion: "TMB = 2000. Suma 500 kcal para volumen.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "2500" } },
  { titulo: "P18. 1RM Básico", descripcion: "Levantaste 100kg a 5 reps. RM = Peso + (Peso*Reps/30). Redondea.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "117" } },
  { titulo: "P19. Limit Brake: Total", descripcion: "Polera = 20000, Envío = 3000. Calcula el total.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "23000" } },
  { titulo: "P20. Limit Brake: Descuento", descripcion: "Precio = 10000. Aplica 10% de descuento.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "9000" } },
  { titulo: "P21. Minecraft: Área Base", descripcion: "Base 5, Altura 4. ¿Cuántos bloques necesitas?", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "20" } },
  { titulo: "P22. GMod: Ping Promedio", descripcion: "Ping1 = 50, Ping2 = 60. Calcula el promedio.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "55" } },
  { titulo: "P23. GMod: Vivos", descripcion: "Total = 32, Muertos = 5. ¿Cuántos viven?", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "27" } },
  { titulo: "P24. Microeconomía: CT", descripcion: "Costo Fijo = 1000, Costo Variable = 500. Costo Total?", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "1500" } },
  { titulo: "P25. Microeconomía: Ingreso", descripcion: "Precio = 10, Cantidad = 50. Ingreso Total?", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "500" } },
  { titulo: "P26. Álgebra: Suma Vectores", descripcion: "Vector A(3,0), B(5,0). Imprime la suma en X.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "8" } },
  { titulo: "P27. Último Dígito", descripcion: "Num = 456. Imprime solo el último dígito.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "P28. Quitar Decimales", descripcion: "Num = 4.8. Imprime la parte entera truncada.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "4" } },
  { titulo: "P29. Cuadrado", descripcion: "Imprime el cuadrado de 6.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "36" } },
  { titulo: "P30. Cubo", descripcion: "Imprime el cubo de 3.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "27" } },

  // --- NIVEL INTERMEDIO (30 Desafíos) ---
  { titulo: "I1. Suma 1 a N", descripcion: "Suma los números del 1 al 5 usando un bucle.", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "15" } },
  { titulo: "I2. Factorial", descripcion: "Calcula el factorial de 4 (4*3*2*1).", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "24" } },
  { titulo: "I3. Fibonacci", descripcion: "Imprime el 6to número de Fibonacci (0,1,1,2,3,5).", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "I4. Contar Vocales", descripcion: "Cuenta las vocales en 'Murcielago'.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "I5. Palíndromo", descripcion: "Es 'oso' un palíndromo? Imprime True o False.", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I6. Revertir String", descripcion: "Reversa la palabra 'Roma'.", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "amoR" } },
  { titulo: "I7. Mayor en Array", descripcion: "Array: [3, 9, 2]. Encuentra el mayor.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "9" } },
  { titulo: "I8. Menor en Array", descripcion: "Array: [8, 1, 5]. Encuentra el menor.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "I9. Promedio Array", descripcion: "Array: [4, 6, 8]. Calcula el promedio.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "I10. Filtrar Pares", descripcion: "Array: [1,2,3,4]. Devuelve solo pares [2,4].", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "[2, 4]" } },
  { titulo: "I11. Filtrar Impares", descripcion: "Array: [1,2,3,4]. Devuelve solo impares [1,3].", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "[1, 3]" } },
  { titulo: "I12. Multiplicar Array", descripcion: "Array: [1,2]. Multiplica todo x2 -> [2,4].", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "[2, 4]" } },
  { titulo: "I13. Contar Ocurrencias", descripcion: "Array: [1,2,2,3]. ¿Cuántas veces está el 2?", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "I14. Buscar Index", descripcion: "Array: [10,20,30]. ¿En qué índice está el 30?", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "I15. Reemplazar Carácter", descripcion: "Cambia las 'a' por 'x' en 'casa'.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "cxsx" } },
  { titulo: "I16. King Fitness: Discos", descripcion: "Filtra discos >= 20kg del array [10,20,15,25].", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "[20, 25]" } },
  { titulo: "I17. King Fitness: Carga", descripcion: "Barra=20. Array discos=[20,20]. Suma total.", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "60" } },
  { titulo: "I18. Gym: Progresión Semanal", descripcion: "Actual:100kg, Meta:110kg. A +2.5kg/sem, ¿Semanas?", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "4" } },
  { titulo: "I19. Limit Brake: Stock Talla", descripcion: "Stock=['S','M','L','M']. Cuenta las 'M'.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "I20. Limit Brake: Carrito", descripcion: "Suma los precios: [15000, 20000].", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "35000" } },
  { titulo: "I21. Limit Brake: IVA", descripcion: "Aplica 19% IVA al array de precios [1000, 2000].", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "[1190, 2380]" } },
  { titulo: "I22. Minecraft: Crafteo", descripcion: "Tienes 10 de hierro. ¿Cuántos picos (3 c/u) haces?", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "I23. GMod: K/D Ratio", descripcion: "Kills:10, Deaths:2. Imprime el ratio.", nivel_dificultad: "Intermedio", xp: 240, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "I24. Álgebra: Producto Punto", descripcion: "V1=[1,2], V2=[3,4]. (1*3)+(2*4).", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "11" } },
  { titulo: "I25. Álgebra: Magnitud", descripcion: "Vector [3,4]. Calcula su magnitud (Pitágoras).", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "I26. Contraseña Fuerte", descripcion: "Clave='Onyx123'. Imprime True si largo >= 8.", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "False" } },
  { titulo: "I27. Quitar Espacios", descripcion: "Convierte 'Hola Mundo' en 'HolaMundo'.", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "HolaMundo" } },
  { titulo: "I28. Anagrama Simple", descripcion: "'roma' y 'amor'. Imprime True si tienen mismas letras.", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I29. Contar Palabras", descripcion: "Cuenta palabras en 'Hola Onyx Study'.", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "I30. Suma de Dígitos", descripcion: "Num = 123. Suma sus dígitos (1+2+3).", nivel_dificultad: "Intermedio", xp: 280, codigo_inicial: "", casos_prueba: { expected: "6" } },

  // --- NIVEL AVANZADO (30 Desafíos) ---
  { titulo: "A1. Bubble Sort", descripcion: "Ordena [3,1,2] usando el algoritmo Burbuja.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3]" } },
  { titulo: "A2. Selection Sort", descripcion: "Ordena [4,1,3] seleccionando el menor.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "[1, 3, 4]" } },
  { titulo: "A3. Insertion Sort", descripcion: "Ordena [5,2,4] insertando en posición.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "[2, 4, 5]" } },
  { titulo: "A4. Búsqueda Binaria", descripcion: "Busca el índice de 44 en [2,15,23,44,55].", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "A5. Matriz: Suma Total", descripcion: "Suma todos los elementos de [[1,2],[3,4]].", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "A6. Matriz: Transpuesta", descripcion: "Transponer [[1,2],[3,4]] a [[1,3],[2,4]].", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "[[1, 3], [2, 4]]" } },
  { titulo: "A7. Matriz: Diagonal", descripcion: "Extrae la diagonal principal de [[1,2],[3,4]].", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "[1, 4]" } },
  { titulo: "A8. Matriz: Multiplicación", descripcion: "Multiplica matrices identidad 2x2 por [[2,3],[4,5]].", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "[[2, 3], [4, 5]]" } },
  { titulo: "A9. Recursión: Factorial", descripcion: "Calcula factorial de 5 SIN usar bucles.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "120" } },
  { titulo: "A10. Recursión: Fibonacci", descripcion: "Encuentra el 7mo Fibonacci de forma recursiva.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "13" } },
  { titulo: "A11. Recursión: Suma Array", descripcion: "Suma [1,2,3] recursivamente cortando el array.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "A12. Frecuencia Caracteres", descripcion: "Retorna mapa de 'aba' -> {a:2, b:1}.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "{a:2, b:1}" } },
  { titulo: "A13. Paréntesis Equilibrados", descripcion: "Valida si '()()' está equilibrado (True).", nivel_dificultad: "Avanzado", xp: 600, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "A14. Two Sum", descripcion: "Array [2,7,11,15], target 9. Retorna índices [0,1].", nivel_dificultad: "Avanzado", xp: 650, codigo_inicial: "", casos_prueba: { expected: "[0, 1]" } },
  { titulo: "A15. Substring más largo", descripcion: "Subcadena sin repetir de 'abcabcbb' es 'abc' (3).", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "A16. Gym: OOP Atleta", descripcion: "Clase Atleta. Instancia con RM=100. Imprime RM.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "100" } },
  { titulo: "A17. Gym: Rutina Generador", descripcion: "Map: Lunes->Pecho. Input 'Lunes', Output 'Pecho'.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Pecho" } },
  { titulo: "A18. LB: POO Inventario", descripcion: "Clase Tienda. Agregar(item). Imprimir len(items)=1.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "A19. LB: Ordenar Precios", descripcion: "Array de objetos. Extrae y ordena los precios.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "Ordenado" } },
  { titulo: "A20. LB: Agrupar Ventas", descripcion: "Agrupa array de ventas por mes usando Diccionarios.", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "Agrupado" } },
  { titulo: "A21. MC: Minería Matriz", descripcion: "Matriz 2x2. Encuentra la coordenada de 'Diamante'.", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "[x, y]" } },
  { titulo: "A22. GMod: Parseo de Logs", descripcion: "Extrae la IP '192.168.1.1' de un string de log.", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "192.168.1.1" } },
  { titulo: "A23. GMod: Baneo POO", descripcion: "Jugador.Ban(). Estado pasa a IsBanned = True.", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "A24. Álgebra: Determinante", descripcion: "Calcula determinante de [[2,1],[3,4]]. (2*4 - 1*3).", nivel_dificultad: "Avanzado", xp: 900, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "A25. Álgebra: Cramer 2x2", descripcion: "Resuelve x + y = 3, x - y = 1 usando matrices.", nivel_dificultad: "Avanzado", xp: 950, codigo_inicial: "", casos_prueba: { expected: "x=2, y=1" } },
  { titulo: "A26. Cifrado César", descripcion: "Cifra 'abc' rotando 1 letra -> 'bcd'.", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "bcd" } },
  { titulo: "A27. Descifrado César", descripcion: "Descifra 'bcd' rotando -1 -> 'abc'.", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "abc" } },
  { titulo: "A28. Número Primo", descripcion: "Verifica si 7 es primo. Imprime True.", nivel_dificultad: "Avanzado", xp: 1100, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "A29. Criba de Eratóstenes", descripcion: "Genera array de primos hasta el 10: [2,3,5,7].", nivel_dificultad: "Avanzado", xp: 1200, codigo_inicial: "", casos_prueba: { expected: "[2, 3, 5, 7]" } },
  { titulo: "A30. Grafo Básico", descripcion: "Representa A->B->C y verifica si C es alcanzable.", nivel_dificultad: "Avanzado", xp: 1500, codigo_inicial: "", casos_prueba: { expected: "True" } }
];

async function main() {
  console.log('Iniciando carga masiva de la malla curricular (90 Desafíos)...');
  
  await prisma.progreso.deleteMany({}); 
  await prisma.desafio.deleteMany({});  
  
  console.log('Tablas limpias. Asignando lenguaje y insertando datos...');

  // Mapeamos el arreglo para agregarle el lenguaje "java" a toda esta primera tanda
  const desafiosConLenguaje = curriculumDesafios.map(reto => ({
    ...reto,
    lenguaje: 'java'
  }));

  const result = await prisma.desafio.createMany({
    data: desafiosConLenguaje,
    skipDuplicates: true,
  });
  
  console.log(`✅ ¡Éxito! ${result.count} desafíos inyectados en la base de datos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });