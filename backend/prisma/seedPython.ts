import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

declare const process: any;

const pythonCurriculum = [
  // --- NIVEL PRINCIPIANTE (30 Desafíos - Sintaxis y Estructuras Básicas) ---
  { titulo: "P1. Py-Mundo", descripcion: "Imprime 'Hola Python' usando print().", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Hola Python" } },
  { titulo: "P2. F-Strings", descripcion: "Usa un f-string para imprimir 'Soy Francisco'. nombre='Francisco'.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Soy Francisco" } },
  { titulo: "P3. Tipos de Datos", descripcion: "Imprime el tipo de dato de 3.14 usando type().", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "<class 'float'>" } },
  { titulo: "P4. División Exacta", descripcion: "Divide 10 entre 3 y devuelve solo la parte entera (usando //).", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "P5. Potencia", descripcion: "Calcula 2 elevado a la 8 (usando **).", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "256" } },
  { titulo: "P6. Slicing Básico", descripcion: "Extrae los primeros 3 caracteres de 'OnyxStudy' usando [0:3].", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Ony" } },
  { titulo: "P7. Slicing Inverso", descripcion: "Invierte el string 'Python' usando [::-1].", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "nohtyP" } },
  { titulo: "P8. Mayúsculas", descripcion: "Convierte 'datos' a mayúsculas usando .upper().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "DATOS" } },
  { titulo: "P9. Título", descripcion: "Convierte 'hola mundo' a formato título usando .title().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Hola Mundo" } },
  { titulo: "P10. Reemplazo", descripcion: "Reemplaza 'Mal' por 'Bien' en 'Todo Mal' usando .replace().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Todo Bien" } },
  { titulo: "P11. Crear Lista", descripcion: "Crea e imprime una lista con [1, 2, 3].", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3]" } },
  { titulo: "P12. Append", descripcion: "Agrega el número 4 a la lista [1, 2, 3] e imprímela.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3, 4]" } },
  { titulo: "P13. Pop", descripcion: "Elimina el último elemento de [10, 20, 30] usando .pop().", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[10, 20]" } },
  { titulo: "P14. Longitud de Lista", descripcion: "Imprime la cantidad de elementos en [5, 4, 3, 2, 1] usando len().", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P15. Ordenar Lista", descripcion: "Ordena [3, 1, 2] usando .sort().", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3]" } },
  { titulo: "P16. Tupla Básica", descripcion: "Crea e imprime una tupla con (10, 20).", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "(10, 20)" } },
  { titulo: "P17. Desempaquetado", descripcion: "a, b = (5, 10). Imprime a.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P18. Diccionario", descripcion: "Crea un dict {'x': 1} e imprímelo.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "{'x': 1}" } },
  { titulo: "P19. Acceder Diccionario", descripcion: "Dado d={'edad': 21}, imprime el valor de 'edad'.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "21" } },
  { titulo: "P20. Set (Conjunto)", descripcion: "Convierte [1, 1, 2] a Set para eliminar duplicados. Imprime.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "{1, 2}" } },
  { titulo: "P21. If / Elif / Else", descripcion: "x=10. Si x>5 imprime 'Mayor', sino 'Menor'.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "Mayor" } },
  { titulo: "P22. Operador In", descripcion: "Imprime True si 'a' está en 'hola'.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "P23. Bucle For IN", descripcion: "Itera [1,2] e imprime cada número.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "1\n2" } },
  { titulo: "P24. Rango", descripcion: "Usa for i in range(3): e imprime i.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "0\n1\n2" } },
  { titulo: "P25. While Loop", descripcion: "x=2. Mientras x>0, imprime x y réstale 1.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "2\n1" } },
  { titulo: "P26. Definir Función", descripcion: "Crea def saludar(): print('Hola'). Llámala.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Hola" } },
  { titulo: "P27. Función con Args", descripcion: "Crea def suma(a, b): return a+b. Imprime suma(2,3).", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P28. Casteo a Int", descripcion: "Convierte el string '100' a int y súmale 5.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "105" } },
  { titulo: "P29. Casteo a String", descripcion: "Convierte 50 a str y concatena con '%'.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "50%" } },
  { titulo: "P30. Bucle con Break", descripcion: "Itera range(5). Si i==2, haz break. Imprime antes del break.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "0\n1" } },

  // --- NIVEL INTERMEDIO (30 Desafíos - Pythonic Way) ---
  { titulo: "I1. List Comprehension", descripcion: "Crea una lista de cuadrados [x**2 for x in range(4)]. Imprime.", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "[0, 1, 4, 9]" } },
  { titulo: "I2. LC con If", descripcion: "Filtra pares [x for x in [1,2,3,4] if x%2==0].", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "[2, 4]" } },
  { titulo: "I3. Dict Comprehension", descripcion: "Crea {x: x**2 for x in (1,2)}. Imprime.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "{1: 1, 2: 4}" } },
  { titulo: "I4. Enumerate", descripcion: "Itera ['a','b'] con enumerate(). Imprime 'index: value'.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "0: a\n1: b" } },
  { titulo: "I5. Zip", descripcion: "Une [1,2] y ['a','b'] con zip(). Imprime como lista de tuplas.", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "[(1, 'a'), (2, 'b')]" } },
  { titulo: "I6. Join", descripcion: "Une ['Onyx', 'Study'] con un espacio usando ' '.join().", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "Onyx Study" } },
  { titulo: "I7. Split", descripcion: "Divide 'A B C' en lista usando .split().", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "['A', 'B', 'C']" } },
  { titulo: "I8. Lambda Básica", descripcion: "Crea f = lambda x: x*2. Imprime f(5).", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "I9. Map", descripcion: "Usa map() y lambda para multiplicar [1,2,3] x 2.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "[2, 4, 6]" } },
  { titulo: "I10. Filter", descripcion: "Usa filter() para sacar pares de [1,2,3,4].", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "[2, 4]" } },
  { titulo: "I11. Argumentos *args", descripcion: "Crea def sumar(*args). Pasa 1,2,3. Devuelve suma.", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "I12. Kwargs **", descripcion: "Crea def perfil(**k). Pasa edad=21. Imprime k['edad'].", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "21" } },
  { titulo: "I13. Manejo Excepciones", descripcion: "Usa try/except para int('A'). En except, imprime 'Error'.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "Error" } },
  { titulo: "I14. Get en Diccionarios", descripcion: "dict={'A':1}. Imprime dict.get('B', 0).", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "0" } },
  { titulo: "I15. Claves y Valores", descripcion: "Imprime list(d.keys()) de {'x':1, 'y':2}.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "['x', 'y']" } },
  { titulo: "I16. Count en Listas", descripcion: "L=[1,1,2]. Imprime L.count(1).", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "I17. Any / All", descripcion: "Imprime any([False, True]).", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I18. Intersección Sets", descripcion: "A={1,2}, B={2,3}. Imprime A & B.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "{2}" } },
  { titulo: "I19. Diferencia Sets", descripcion: "A={1,2}, B={2,3}. Imprime A - B.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "{1}" } },
  { titulo: "I20. Matriz Flatten", descripcion: "Convierte [[1,2],[3,4]] en [1,2,3,4] con List Comp.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3, 4]" } },
  { titulo: "I21. Suma Condicional", descripcion: "Suma los positivos de [-1, 2, 3, -4].", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "I22. Validar Anagrama (Sorted)", descripcion: "Imprime True si sorted('roma') == sorted('amor').", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I23. Eliminar Duplicados (Preservar Orden)", descripcion: "Quita duplicados de [2,1,2,3] sin usar set() para no desordenar.", nivel_dificultad: "Intermedio", xp: 240, codigo_inicial: "", casos_prueba: { expected: "[2, 1, 3]" } },
  { titulo: "I24. Diccionario de Frecuencias", descripcion: "Cuenta letras en 'aba'. Salida: {'a':2, 'b':1}.", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "{'a': 2, 'b': 1}" } },
  { titulo: "I25. Encontrar Elemento Mayoritario", descripcion: "En [1,1,2], encuentra el número que aparece más veces.", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "I26. String a Int sin int()", descripcion: "Convierte '12' a int multiplicando por 10 (ASCII).", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "12" } },
  { titulo: "I27. Max/Min con Lambda", descripcion: "Usa max(['a', 'ccc', 'bb'], key=len) para el más largo.", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "ccc" } },
  { titulo: "I28. Isinstance", descripcion: "Imprime isinstance(5, int).", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "True" } },
  { titulo: "I29. Rotar Lista Izquierda", descripcion: "Rota [1,2,3] -> [2,3,1] usando Slicing L[1:] + L[:1].", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "[2, 3, 1]" } },
  { titulo: "I30. Ordenar Tuplas por 2do valor", descripcion: "Ordena [(1,3), (2,2)] -> [(2,2), (1,3)] usando lambda.", nivel_dificultad: "Intermedio", xp: 280, codigo_inicial: "", casos_prueba: { expected: "[(2, 2), (1, 3)]" } },

  // --- NIVEL AVANZADO (30 Desafíos - Data Science, POO y Genertors) ---
  { titulo: "A1. Clase Básica", descripcion: "Crea class Perro: pasale nombre. Instancia e imprime perro.nombre.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Nombre" } },
  { titulo: "A2. Método Mágico __init__", descripcion: "Usa def __init__(self, x). Inicializa y accede a x.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "x" } },
  { titulo: "A3. Método Mágico __str__", descripcion: "Sobreescribe __str__ para que al hacer print(obj) diga 'Onyx'.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Onyx" } },
  { titulo: "A4. Herencia", descripcion: "class Gato(Mascota):. Hereda y llama un método del padre.", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "Miau" } },
  { titulo: "A5. Super()", descripcion: "Usa super().__init__() dentro de una clase hija.", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "Iniciado" } },
  { titulo: "A6. Método de Clase (@classmethod)", descripcion: "Crea un @classmethod que devuelva 10. Llámalo Clase.metodo().", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "A7. Método Estático (@staticmethod)", descripcion: "Crea un @staticmethod de suma. Llámalo sin instanciar.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "A8. Generador Básico (yield)", descripcion: "Crea def gen(): yield 1. Haz next(gen()).", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "A9. Generar Infinito", descripcion: "Crea un while True con yield. Saca los primeros 3 usando next().", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "1\n2\n3" } },
  { titulo: "A10. Decorador Básico", descripcion: "Crea un decorador que imprima 'A' antes y 'B' después de una función.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "A\nFunc\nB" } },
  { titulo: "A11. Property (@property)", descripcion: "Convierte un método def nombre() en propiedad. Accede sin paréntesis.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Valor" } },
  { titulo: "A12. Encapsulamiento (Dunder)", descripcion: "Crea self.__secreto. Intenta acceder. Maneja el AttributeError.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Bloqueado" } },
  { titulo: "A13. Two Sum (Optimizado con Set)", descripcion: "Array [2,7,11,15], target 9. Retorna índices [0,1] en O(N).", nivel_dificultad: "Avanzado", xp: 600, codigo_inicial: "", casos_prueba: { expected: "[0, 1]" } },
  { titulo: "A14. Walrus Operator (:=)", descripcion: "Usa (n := 5) dentro de un if para validar e imprimir a la vez.", nivel_dificultad: "Avanzado", xp: 650, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "A15. Tipado (Type Hinting)", descripcion: "Define def suma(a: int) -> int:. (Aunque Python lo ignora, usa la sintaxis).", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Correcto" } },
  { titulo: "A16. Eval", descripcion: "Usa eval('2 + 2') para ejecutar un string como código.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "4" } },
  { titulo: "A17. Recursión: Memoización", descripcion: "Haz Fibonacci recursivo, pero guarda resultados en un diccionario {}.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Optimizado" } },
  { titulo: "A18. Búsqueda Binaria Pythonic", descripcion: "Implementa búsqueda binaria. Usa índices left, right.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "Encontrado" } },
  { titulo: "A19. Combinaciones (Backtracking)", descripcion: "Genera todas las permutaciones de [1,2] -> [[1,2], [2,1]].", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "[[1, 2], [2, 1]]" } },
  { titulo: "A20. Subconjuntos (Powerset)", descripcion: "Genera subconjuntos de [1] -> [[], [1]].", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "[[], [1]]" } },
  { titulo: "A21. Grafo: Lista de Adyacencia", descripcion: "Usa un Diccionario de listas para simular nodos A -> B y B -> C.", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "{'A': ['B'], 'B': ['C']}" } },
  { titulo: "A22. BFS (Anchura)", descripcion: "Implementa Búsqueda en Anchura usando una Lista como Cola (pop(0)).", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "Visitado" } },
  { titulo: "A23. DFS (Profundidad)", descripcion: "Implementa DFS usando Recursión.", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "Visitado" } },
  { titulo: "A24. Pila (Stack) con Lista", descripcion: "Usa append() y pop() para simular pila (LIFO).", nivel_dificultad: "Avanzado", xp: 900, codigo_inicial: "", casos_prueba: { expected: "LIFO" } },
  { titulo: "A25. Cola (Queue) con Lista", descripcion: "Usa append() y pop(0) para simular cola (FIFO).", nivel_dificultad: "Avanzado", xp: 950, codigo_inicial: "", casos_prueba: { expected: "FIFO" } },
  { titulo: "A26. Ordenamiento Merge Sort", descripcion: "Implementa Merge Sort dividiendo y uniendo listas (Slicing).", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3]" } },
  { titulo: "A27. Quick Sort Pythonic", descripcion: "Haz Quick Sort en 3 líneas usando List Comprehensions (left, pivot, right).", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "Ordenado" } },
  { titulo: "A28. Algoritmo de Kadane", descripcion: "Suma máxima de un subarreglo contiguo en [-2,1,-3,4,-1,2,1,-5,4] -> 6.", nivel_dificultad: "Avanzado", xp: 1100, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "A29. Sliding Window", descripcion: "Encuentra la suma máxima de 2 elementos seguidos en [100, 200, 300, 400].", nivel_dificultad: "Avanzado", xp: 1200, codigo_inicial: "", casos_prueba: { expected: "700" } },
  { titulo: "A30. Dunder __add__", descripcion: "Sobreescribe el método __add__ para poder sumar dos objetos (obj1 + obj2).", nivel_dificultad: "Avanzado", xp: 1500, codigo_inicial: "", casos_prueba: { expected: "Suma de Objetos" } }
];

async function main() {
  console.log('Iniciando inyección de la malla curricular para PYTHON (90 Desafíos)...');
  
  // IMPORTANTE: Solo borramos los retos de Python para NO destruir los de Java
  await prisma.desafio.deleteMany({
    where: { lenguaje: 'python' }
  });  
  
  console.log('Retos antiguos de Python limpiados. Insertando nuevos...');

  // Aseguramos que todos tengan la etiqueta de lenguaje correspondiente
  const pythonDesafios = pythonCurriculum.map(reto => ({
    ...reto,
    lenguaje: 'python'
  }));

  const result = await prisma.desafio.createMany({
    data: pythonDesafios,
    skipDuplicates: true,
  });
  
  console.log(`✅ ¡Éxito! ${result.count} desafíos de PYTHON inyectados en la base de datos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });