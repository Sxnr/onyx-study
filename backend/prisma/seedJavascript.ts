import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

declare const process: any;

const jsCurriculum = [
  // --- NIVEL PRINCIPIANTE (30 Desafíos - Fundamentos y Sintaxis JS) ---
  { titulo: "P1. Hola Consola", descripcion: "Imprime 'Onyx Study' usando console.log().", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Onyx Study" } },
  { titulo: "P2. Variables Const", descripcion: "Declara una constante PI = 3.14 e imprímela.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "3.14" } },
  { titulo: "P3. Template Literals", descripcion: "Usa backticks (`) para imprimir 'Hola Francisco'. nombre='Francisco'.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Hola Francisco" } },
  { titulo: "P4. Tipo de Dato", descripcion: "Usa typeof para imprimir el tipo de 42.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "number" } },
  { titulo: "P5. Operador Ternario", descripcion: "edad=20. Usa un ternario para imprimir 'Mayor' si >= 18, sino 'Menor'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Mayor" } },
  { titulo: "P6. String Length", descripcion: "Imprime la longitud del string 'JavaScript'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "P7. ToUpperCase", descripcion: "Convierte 'chile' a mayúsculas.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "CHILE" } },
  { titulo: "P8. IndexOf", descripcion: "Encuentra el índice de la letra 'S' en 'Onyx Study'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P9. Replace", descripcion: "Reemplaza 'Gato' por 'Perro' en 'Hola Gato'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Hola Perro" } },
  { titulo: "P10. ParseInt", descripcion: "Convierte el string '100' a número entero e imprime.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "100" } },
  { titulo: "P11. Crear Array", descripcion: "Crea un arreglo con [1, 2, 3] e imprímelo.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[ 1, 2, 3 ]" } },
  { titulo: "P12. Push", descripcion: "Agrega el 4 al final de [1, 2, 3] usando push().", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[ 1, 2, 3, 4 ]" } },
  { titulo: "P13. Pop", descripcion: "Elimina el último elemento de [10, 20] usando pop().", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[ 10 ]" } },
  { titulo: "P14. Shift", descripcion: "Elimina el primer elemento de [1, 2, 3] usando shift().", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[ 2, 3 ]" } },
  { titulo: "P15. Unshift", descripcion: "Agrega el 0 al inicio de [1, 2] usando unshift().", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "[ 0, 1, 2 ]" } },
  { titulo: "P16. Objeto Literal", descripcion: "Crea un objeto user={nombre:'Onyx'} e imprime su nombre.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "Onyx" } },
  { titulo: "P17. Agregar Propiedad", descripcion: "Al objeto obj={} agrégale obj.edad = 21. Imprime edad.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "21" } },
  { titulo: "P18. Bucle For Clásico", descripcion: "Itera del 1 al 3 usando let i=1; i<=3; i++.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "1\n2\n3" } },
  { titulo: "P19. For...of", descripcion: "Itera el array ['a', 'b'] usando for...of.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "a\nb" } },
  { titulo: "P20. For...in", descripcion: "Itera las claves del objeto {x:1} usando for...in.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "x" } },
  { titulo: "P21. Función Tradicional", descripcion: "Crea function suma(a,b) y retorna a+b. Imprime suma(2,2).", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "4" } },
  { titulo: "P22. Math.floor", descripcion: "Redondea 4.9 hacia abajo.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "4" } },
  { titulo: "P23. Math.ceil", descripcion: "Redondea 4.1 hacia arriba.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P24. Math.random", descripcion: "Imprime un número aleatorio entre 0 y 1.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "0.xxx" } },
  { titulo: "P25. Doble Igual vs Triple Igual", descripcion: "Imprime True si 5 === 5 (comparación estricta).", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "P26. Discord Bot: Ping", descripcion: "msg='!ping'. Si msg es '!ping', imprime 'Pong!'.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Pong!" } },
  { titulo: "P27. Discord Bot: Prefix", descripcion: "Comprueba si el msg '!help' empieza con '!' usando .startsWith().", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "P28. Limit Brake: Stock", descripcion: "stock=0. Si stock===0, imprime 'Agotado'.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Agotado" } },
  { titulo: "P29. Array isArray", descripcion: "Usa Array.isArray([1,2]) para validar si es un arreglo.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "P30. Includes", descripcion: "Verifica si 'JS' está en ['Java', 'JS', 'C++'] usando .includes().", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "True" } },

  // --- NIVEL INTERMEDIO (30 Desafíos - ES6, Callbacks, Arrays Modernos) ---
  { titulo: "I1. Arrow Function", descripcion: "Crea const suma = (a,b) => a+b. Imprime suma(3,3).", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "I2. Array.map()", descripcion: "Multiplica [1,2,3] x 2 usando .map(). Imprime array.", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "[ 2, 4, 6 ]" } },
  { titulo: "I3. Array.filter()", descripcion: "Filtra pares de [1,2,3,4] usando .filter().", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "[ 2, 4 ]" } },
  { titulo: "I4. Array.reduce()", descripcion: "Suma los elementos de [10,20,30] usando .reduce().", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "60" } },
  { titulo: "I5. Array.find()", descripcion: "Encuentra el primer número > 5 en [2,4,6,8].", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "I6. Array.some()", descripcion: "¿Hay algún negativo en [1, -2, 3]? Usa .some().", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I7. Array.every()", descripcion: "¿Son todos positivos en [1, 2, 3]? Usa .every().", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I8. Desestructuración Array", descripcion: "const [a, b] = [10, 20]. Imprime a.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "I9. Desestructuración Objeto", descripcion: "const { edad } = { nombre:'F', edad:21 }. Imprime edad.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "21" } },
  { titulo: "I10. Spread Operator Array", descripcion: "Une arr1=[1,2] y arr2=[3,4] usando [...arr1, ...arr2].", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "[ 1, 2, 3, 4 ]" } },
  { titulo: "I11. Spread Operator Objeto", descripcion: "Clona {a:1} y añade b:2 usando { ...obj, b:2 }.", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "{ a: 1, b: 2 }" } },
  { titulo: "I12. Rest Parameters", descripcion: "def suma(...nums) y haz reduce para sumar. Pasa (1,2,3).", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "I13. Set Timeout", descripcion: "Imprime 'Fin' después de 1 segundo (usa setTimeout simulado).", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "Fin" } },
  { titulo: "I14. JSON Stringify", descripcion: "Convierte {x:1} a string JSON.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: '{"x":1}' } },
  { titulo: "I15. JSON Parse", descripcion: "Convierte '{\"y\":2}' a objeto e imprime y.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "I16. Object.keys", descripcion: "Imprime las llaves de {id:1, role:'admin'}.", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "[ 'id', 'role' ]" } },
  { titulo: "I17. Object.values", descripcion: "Imprime los valores de {a:10, b:20}.", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "[ 10, 20 ]" } },
  { titulo: "I18. Object.entries", descripcion: "Convierte {x:1} a array de arrays [[clave, valor]].", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "[ [ 'x', 1 ] ]" } },
  { titulo: "I19. Optional Chaining (?.)", descripcion: "user={}. Imprime user?.perfil?.foto para evitar errores.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "undefined" } },
  { titulo: "I20. Nullish Coalescing (??)", descripcion: "nombre = null. Imprime nombre ?? 'Anónimo'.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "Anónimo" } },
  { titulo: "I21. Limit Brake: Map Precios", descripcion: "Mapea [{p:10}, {p:20}] a un array de puros precios [10, 20].", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "[ 10, 20 ]" } },
  { titulo: "I22. Limit Brake: Reduce Total", descripcion: "Suma los precios del array [{p:10}, {p:20}] usando reduce.", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "30" } },
  { titulo: "I23. GMod: Filter Jugadores", descripcion: "Filtra [{n:'A', vivo:true}, {n:'B', vivo:false}] para los vivos.", nivel_dificultad: "Intermedio", xp: 240, codigo_inicial: "", casos_prueba: { expected: "[ { n: 'A', vivo: true } ]" } },
  { titulo: "I24. Promise Resolve Básica", descripcion: "Crea Promise.resolve('Hecho'). Haz .then(res => console.log(res)).", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "Hecho" } },
  { titulo: "I25. Promesa Custom", descripcion: "new Promise((resolve) => resolve('OK')).then().", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "OK" } },
  { titulo: "I26. Catch Error", descripcion: "Promise.reject('Fallo').catch(err => console.log(err)).", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "Fallo" } },
  { titulo: "I27. Set para Duplicados", descripcion: "Usa [...new Set([1,1,2])] para limpiar array.", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "[ 1, 2 ]" } },
  { titulo: "I28. Split y Join", descripcion: "Reemplaza guiones por espacios 'a-b-c'.split('-').join(' ').", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "a b c" } },
  { titulo: "I29. Sort de Strings", descripcion: "Ordena alfabéticamente ['Zebra', 'Gato', 'Perro'].", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "[ 'Gato', 'Perro', 'Zebra' ]" } },
  { titulo: "I30. Sort Numérico", descripcion: "Ordena [10, 2, 5] usando .sort((a,b) => a-b).", nivel_dificultad: "Intermedio", xp: 280, codigo_inicial: "", casos_prueba: { expected: "[ 2, 5, 10 ]" } },

  // --- NIVEL AVANZADO (30 Desafíos - Async/Await, Closures, DOM Simulado) ---
  { titulo: "A1. Async Function", descripcion: "Crea una función async que retorne 'Data'. Llama su .then().", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Data" } },
  { titulo: "A2. Await Básico", descripcion: "Usa await Promise.resolve('Esperado') dentro de un async. Imprime.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Esperado" } },
  { titulo: "A3. Try / Catch Async", descripcion: "Atrapa un await Promise.reject('Error 404') en un bloque try/catch.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Error 404" } },
  { titulo: "A4. Fetch API (Simulado)", descripcion: "Simula fetch() retornando un objeto Response con .json().", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "{ data: true }" } },
  { titulo: "A5. Promise.all()", descripcion: "Ejecuta 2 promesas a la vez y recupera ambos resultados en array.", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "[ 'Res1', 'Res2' ]" } },
  { titulo: "A6. Class JS", descripcion: "Crea class Usuario { constructor(n){this.n=n} }. Instancia e imprime.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "Usuario" } },
  { titulo: "A7. Clases: Extends", descripcion: "class Admin extends Usuario. Llama a super() en el constructor.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "Admin" } },
  { titulo: "A8. Clases: Métodos Estáticos", descripcion: "Crea static getRol() { return 'Root'; }. Llama sin instanciar.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Root" } },
  { titulo: "A9. Getters JS", descripcion: "Usa 'get nombreCompleto()' para retornar nombre + apellido.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Francisco Carrera" } },
  { titulo: "A10. Setters JS", descripcion: "Usa 'set edad(v)' para evitar que se asigne edad < 0.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Edad Inválida" } },
  { titulo: "A11. Closure (Clausura)", descripcion: "Retorna una función desde otra función que recuerde su scope léxico.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Contador: 1" } },
  { titulo: "A12. IIFE", descripcion: "Crea una función autoejecutable (function(){})() que imprima 'Run'.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Run" } },
  { titulo: "A13. Deep Clone", descripcion: "Clona profundamente un objeto usando JSON.parse(JSON.stringify(obj)).", nivel_dificultad: "Avanzado", xp: 600, codigo_inicial: "", casos_prueba: { expected: "Clon Profundo" } },
  { titulo: "A14. Debounce (Concepto)", descripcion: "Estructura un debounce function para evitar múltiples clicks.", nivel_dificultad: "Avanzado", xp: 650, codigo_inicial: "", casos_prueba: { expected: "Solo una ejecución" } },
  { titulo: "A15. Reduce Avanzado", descripcion: "Agrupa [{'tipo':'A'}, {'tipo':'B'}, {'tipo':'A'}] por tipo usando reduce.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "{ A: 2, B: 1 }" } },
  { titulo: "A16. Discord Bot: Command Handler", descripcion: "Crea un dict de funciones comandos={ '!ping': ()=>print('pong') }. Ejecuta dinámico.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "pong" } },
  { titulo: "A17. Limit Brake: Descuento Compuesto", descripcion: "Aplica reduce para procesar array de cupones sobre el subtotal.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Precio Final" } },
  { titulo: "A18. Map vs Set vs WeakMap", descripcion: "Guarda un dato en un Map() real usando map.set('clave', 'valor').", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "valor" } },
  { titulo: "A19. Generadores function*", descripcion: "Crea function* idMaker() con yield. Imprime next().value.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "0" } },
  { titulo: "A20. Recursión JS", descripcion: "Aplana el array [1, [2, [3]]] a [1, 2, 3] usando recursión (.flat simulado).", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "[ 1, 2, 3 ]" } },
  { titulo: "A21. Búsqueda Binaria JS", descripcion: "Algoritmo de búsqueda binaria iterativo en array ordenado.", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "Índice Encontrado" } },
  { titulo: "A22. React State Simulado", descripcion: "Crea hook fake function useState(val) que retorne [val, setter].", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "Seteado" } },
  { titulo: "A23. Two Pointers", descripcion: "Encuentra palindromos revisando string desde inicio y final a la vez.", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "Es Palíndromo" } },
  { titulo: "A24. Promise.race()", descripcion: "Corre dos promesas, imprime la que responda más rápido.", nivel_dificultad: "Avanzado", xp: 900, codigo_inicial: "", casos_prueba: { expected: "Rápida" } },
  { titulo: "A25. Call, Apply, Bind", descripcion: "Cambia el contexto 'this' de una función usando .bind().", nivel_dificultad: "Avanzado", xp: 950, codigo_inicial: "", casos_prueba: { expected: "Contexto Cambiado" } },
  { titulo: "A26. Patrón Módulo", descripcion: "Crea un módulo IIFE que retorne funciones públicas ocultando variables privadas.", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "Privado Seguro" } },
  { titulo: "A27. Memoización", descripcion: "Crea función memoize() que cachee resultados previos en un Map.", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "Cache Hit" } },
  { titulo: "A28. Regex Validar Email", descripcion: "Usa expresion regular /.+@.+\..+/ para validar string.", nivel_dificultad: "Avanzado", xp: 1100, codigo_inicial: "", casos_prueba: { expected: "Email Válido" } },
  { titulo: "A29. Event Loop Tracker", descripcion: "Adivina orden de ejecución de Sync, Microtask (Promise) y Macrotask (Timeout).", nivel_dificultad: "Avanzado", xp: 1200, codigo_inicial: "", casos_prueba: { expected: "1 3 2" } },
  { titulo: "A30. Proxy JS", descripcion: "Crea un new Proxy() para interceptar cuando se lee o escribe una propiedad en un objeto.", nivel_dificultad: "Avanzado", xp: 1500, codigo_inicial: "", casos_prueba: { expected: "Interceptado" } }
];

async function main() {
  console.log('Iniciando inyección de la malla curricular para JAVASCRIPT (90 Desafíos)...');
  
  // IMPORTANTE: Solo borramos los retos de JavaScript
  await prisma.desafio.deleteMany({
    where: { lenguaje: 'javascript' }
  });  
  
  console.log('Retos antiguos de JavaScript limpiados. Insertando nuevos...');

  // Asignamos el tag de lenguaje a todo el set
  const jsDesafios = jsCurriculum.map(reto => ({
    ...reto,
    lenguaje: 'javascript'
  }));

  const result = await prisma.desafio.createMany({
    data: jsDesafios,
    skipDuplicates: true,
  });
  
  console.log(`✅ ¡Éxito! ${result.count} desafíos de JAVASCRIPT inyectados en la base de datos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });