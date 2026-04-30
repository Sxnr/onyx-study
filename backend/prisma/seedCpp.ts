import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

declare const process: any;

const cppCurriculum = [
  // --- NIVEL PRINCIPIANTE (30 Desafíos - I/O, Tipos y Control de Flujo) ---
  { titulo: "P1. std::cout", descripcion: "Imprime 'Onyx C++' usando std::cout.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Onyx C++" } },
  { titulo: "P2. Salto de línea", descripcion: "Imprime 'Hola' y 'Mundo' en líneas separadas usando std::endl.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Hola\nMundo" } },
  { titulo: "P3. Suma Int", descripcion: "Suma int a=5 y b=7. Imprime el resultado.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "12" } },
  { titulo: "P4. Tipos: double", descripcion: "Calcula el área de un círculo (PI * 3 * 3). PI=3.14159.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "28.2743" } },
  { titulo: "P5. Tipos: bool", descripcion: "Imprime el resultado de (10 > 5) usando std::boolalpha.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "true" } },
  { titulo: "P6. Resto (Módulo)", descripcion: "Imprime el resto de dividir 15 entre 4.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "P7. std::string Básico", descripcion: "Concatena string a='Motor ' y b='C++'. Imprime.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Motor C++" } },
  { titulo: "P8. Longitud String", descripcion: "Imprime la longitud de 'Unreal Engine' usando .length().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "13" } },
  { titulo: "P9. Carácter Indexado", descripcion: "Imprime la primera letra de 'GMod' usando [0].", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "G" } },
  { titulo: "P10. Condicional if", descripcion: "hp=0. Si hp <= 0, imprime 'Game Over'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Game Over" } },
  { titulo: "P11. else if", descripcion: "nota=55. Si nota>=60 'Aprobado', sino 'Reprobado'.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "Reprobado" } },
  { titulo: "P12. Operador Lógico AND", descripcion: "Imprime 'Login' si user=='admin' && pass=='123'.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "Login" } },
  { titulo: "P13. Operador Lógico OR", descripcion: "Imprime 'Drop' si isBoss == true || isRare == true.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "Drop" } },
  { titulo: "P14. Switch Case", descripcion: "Usa switch(2). Case 1:'Pistola', Case 2:'Rifle'. Imprime.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "Rifle" } },
  { titulo: "P15. Bucle for", descripcion: "Imprime del 1 al 3 usando for (int i=1; i<=3; i++).", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "1\n2\n3" } },
  { titulo: "P16. Bucle while", descripcion: "ammo=3. Mientras ammo>0, imprime ammo y réstale 1.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "3\n2\n1" } },
  { titulo: "P17. Array estático", descripcion: "Crea int arr[3] = {10,20,30}. Imprime el de índice 1.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "20" } },
  { titulo: "P18. Recorrer Array", descripcion: "Recorre {5,10} e imprime sus valores.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "5\n10" } },
  { titulo: "P19. Suma de Array", descripcion: "Suma los elementos de {1,2,3} con un bucle.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "P20. Función void", descripcion: "Crea void saludar() que imprima 'Hola'. Llámala en main.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "Hola" } },
  { titulo: "P21. Función con return", descripcion: "Crea int cuadrado(int x). Retorna x*x. Imprime cuadrado(4).", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "16" } },
  { titulo: "P22. Math: pow", descripcion: "Incluye <cmath>. Calcula pow(2, 3).", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "8" } },
  { titulo: "P23. Math: sqrt", descripcion: "Calcula la raíz cuadrada de 25 usando sqrt().", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P24. Casting Básico", descripcion: "Convierte float 3.99 a int e imprime (debe perder decimales).", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "P25. Auto Keyword", descripcion: "Usa auto x = 10; auto y = 5; imprime x+y.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "15" } },
  { titulo: "P26. Macro #define", descripcion: "Crea #define MAX 100. Imprime MAX.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "100" } },
  { titulo: "P27. Operador ++", descripcion: "int a=0; a++; a+=2; Imprime a.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "P28. Modificar String", descripcion: "string txt='Bato'; txt[0]='G'; Imprime.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Gato" } },
  { titulo: "P29. Break", descripcion: "Bucle for al 10. Si i==2 break. Imprime i antes.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "0\n1" } },
  { titulo: "P30. Continue", descripcion: "Bucle for al 3. Si i==1 continue. Imprime 0 y 2.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "0\n2" } },

  // --- NIVEL INTERMEDIO (30 Desafíos - Memoria, Punteros, Vectors y POO) ---
  { titulo: "I1. std::vector", descripcion: "Incluye <vector>. Crea vector<int> v={1,2}. Imprime v[0].", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "I2. Vector push_back", descripcion: "Añade 3 a un vector vacío con push_back().", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "I3. Vector size()", descripcion: "Imprime el tamaño de {10,20,30}.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "I4. Range-based for", descripcion: "Recorre vector {1,2} con for(int x : v) e imprime.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "1\n2" } },
  { titulo: "I5. Pasar por Valor", descripcion: "Función suma(int a). Intenta modificar 'a' dentro. Imprime original (no cambia).", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "Original" } },
  { titulo: "I6. Pasar por Referencia (&)", descripcion: "Función curar(int &hp). Suma 10. Imprime variable original (cambiada).", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "Modificada" } },
  { titulo: "I7. Dirección de Memoria", descripcion: "int x=5. Imprime la dirección de memoria usando &x.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "0x..." } },
  { titulo: "I8. Puntero Básico (*)", descripcion: "int x=10; int *ptr = &x; Imprime el VALOR desreferenciando con *ptr.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "I9. Modificar Puntero", descripcion: "int x=5; int *ptr = &x; *ptr = 20; Imprime x.", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "20" } },
  { titulo: "I10. Struct Básico", descripcion: "Crea struct Player { int hp; }; Instancia y asigna hp=100. Imprime.", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "100" } },
  { titulo: "I11. Class Básica", descripcion: "class Arma { public: int dmg=50; }; Instancia e imprime dmg.", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "50" } },
  { titulo: "I12. Constructor de Clase", descripcion: "Clase Enemigo con constructor que tome (int salud).", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "Construido" } },
  { titulo: "I13. Encapsulamiento", descripcion: "Variable private: int pass=123. Haz un getPass() public para leerla.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "123" } },
  { titulo: "I14. std::sort", descripcion: "Incluye <algorithm>. Ordena vector {3,1,2} con std::sort(v.begin(), v.end()).", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "1 2 3" } },
  { titulo: "I15. std::reverse", descripcion: "Invierte un vector {1,2,3} con std::reverse.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "3 2 1" } },
  { titulo: "I16. std::find", descripcion: "Busca el 4 en {1,2,4,8} usando std::find. Verifica si iterador != end().", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "Encontrado" } },
  { titulo: "I17. std::map", descripcion: "Crea map<string, int> m; m['edad']=21. Imprime.", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "21" } },
  { titulo: "I18. Iterar std::map", descripcion: "Recorre map con for(auto const& pair : m). Imprime llaves y valores.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "Clave Valor" } },
  { titulo: "I19. std::swap", descripcion: "Intercambia a=5, b=10 usando std::swap(a,b).", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "10 5" } },
  { titulo: "I20. Sobrecarga de Funciones", descripcion: "Haz void sumar(int a, int b) y void sumar(double a, double b).", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "Ambas funcionan" } },
  { titulo: "I21. Parámetros por Defecto", descripcion: "void print(int a, int b=0). Llama print(5).", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "5 0" } },
  { titulo: "I22. Enum Básico", descripcion: "enum Estado { VIVO, MUERTO }. Asigna VIVO a int e imprime (saldrá 0).", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "0" } },
  { titulo: "I23. Enum Class", descripcion: "enum class Color { RED, BLUE }. Requiere casting a int para imprimir.", nivel_dificultad: "Intermedio", xp: 240, codigo_inicial: "", casos_prueba: { expected: "Cast Exitoso" } },
  { titulo: "I24. Matriz Vector 2D", descripcion: "vector<vector<int>> m = {{1,2},{3,4}}. Imprime m[1][0] (debe ser 3).", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "I25. Funciones inline", descripcion: "Crea inline int cubo(int x). Mejora el rendimiento en bucles.", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "Compila" } },
  { titulo: "I26. String append", descripcion: "s='Hola'. Haz s.append(' Mundo').", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "Hola Mundo" } },
  { titulo: "I27. String substr", descripcion: "s='Onyx Study'. Extrae 'Study' con s.substr(5, 5).", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "Study" } },
  { titulo: "I28. Try Catch Básico", descripcion: "Lanza throw runtime_error('Boom'). Atrápalo e imprime e.what().", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "Boom" } },
  { titulo: "I29. Puntero a Array", descripcion: "int arr[3]={1,2,3}; int* p = arr; Imprime *(p+1) (debe ser 2).", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "I30. Puntero nulo (nullptr)", descripcion: "int* p = nullptr. Verifica si (p == nullptr) imprime True.", nivel_dificultad: "Intermedio", xp: 280, codigo_inicial: "", casos_prueba: { expected: "True" } },

  // --- NIVEL AVANZADO (30 Desafíos - Memoria Dinámica, Templates, Smart Pointers C++11/20) ---
  { titulo: "A1. Memoria Dinámica (new)", descripcion: "Usa int* p = new int(10). Imprime y luego usa delete p.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "A2. Array Dinámico", descripcion: "new int[3]. Asigna y no olvides delete[] para evitar Memory Leaks.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Array Borrado" } },
  { titulo: "A3. Smart Pointer: unique_ptr", descripcion: "Incluye <memory>. std::make_unique<int>(20). No requiere delete.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "20" } },
  { titulo: "A4. Smart Pointer: shared_ptr", descripcion: "Crea shared_ptr, asignalo a otro y verifica su .use_count() (debe ser 2).", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "A5. Templates Básicos", descripcion: "template <typename T> T maximo(T a, T b). Prueba con int y double.", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "Genérico" } },
  { titulo: "A6. Clase Template", descripcion: "template <class T> class Caja. Guarda un T y haz un getter.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "T Funciona" } },
  { titulo: "A7. Herencia OOP", descripcion: "class Vehiculo {}. class Coche : public Vehiculo. Hereda variables.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "Heredado" } },
  { titulo: "A8. Polimorfismo (virtual)", descripcion: "Método virtual void sonido() en Padre. Sobrescribe en Hijo.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Sonido de Hijo" } },
  { titulo: "A9. Keyword override", descripcion: "Usa 'override' al sobrescribir para asegurar validación del compilador.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Override OK" } },
  { titulo: "A10. Clases Abstractas (= 0)", descripcion: "Haz una función virtual pura virtual void atacar() = 0; Instancia clase derivada.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Interface Creada" } },
  { titulo: "A11. Sobrecarga de Operadores (+)", descripcion: "En clase Vector2, sobrecarga operator+ para sumar objetos v1 + v2.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Suma Vectorial" } },
  { titulo: "A12. Sobrecarga de Ostream (<<)", descripcion: "Sobrecarga operator<< para hacer cout << obj.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Impresión Custom" } },
  { titulo: "A13. Funciones Lambda", descripcion: "auto suma = [](int a, int b){ return a+b; }; Llámala.", nivel_dificultad: "Avanzado", xp: 600, codigo_inicial: "", casos_prueba: { expected: "Lambda Funciona" } },
  { titulo: "A14. Lambda con Captura [&]", descripcion: "Captura variable externa por referencia [&] y modifícala en la lambda.", nivel_dificultad: "Avanzado", xp: 650, codigo_inicial: "", casos_prueba: { expected: "Modificada" } },
  { titulo: "A15. std::for_each y Lambda", descripcion: "Recorre vector y suma 1 a cada elemento usando for_each + lambda.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Todos modificados" } },
  { titulo: "A16. std::accumulate", descripcion: "Incluye <numeric>. Suma todos los elementos de un vector.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Suma Total" } },
  { titulo: "A17. Move Semantics (std::move)", descripcion: "Usa std::move para robar los datos de un string s1 a s2 (C++11).", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Movido Eficiente" } },
  { titulo: "A18. Constructor de Movimiento", descripcion: "Crea Move Constructor para evitar copias profundas de arrays.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "O(1) Copy" } },
  { titulo: "A19. Estructura Nodo (Linked List)", descripcion: "struct Node { int data; Node* next; }. Conecta dos nodos.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "Enlazados" } },
  { titulo: "A20. Recorrer Linked List", descripcion: "Recorre una lista enlazada con while(head != nullptr).", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "Recorrido" } },
  { titulo: "A21. Lista Enlazada Invertida", descripcion: "Algoritmo avanzado: Invierte los punteros de una LinkedList.", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "Reversed" } },
  { titulo: "A22. Pila (std::stack)", descripcion: "Incluye <stack>. push(1), push(2). Imprime s.top() y s.pop().", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "LIFO C++" } },
  { titulo: "A23. Cola (std::queue)", descripcion: "Incluye <queue>. push(1), push(2). Imprime q.front().", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "FIFO C++" } },
  { titulo: "A24. Set vs Unordered_Set", descripcion: "Inserta 100k ints. Comprende por qué unordered (Hash) es O(1).", nivel_dificultad: "Avanzado", xp: 900, codigo_inicial: "", casos_prueba: { expected: "Hash Table" } },
  { titulo: "A25. Map: Contar Frecuencias", descripcion: "Dado vector {1,1,2}, usa map para contar {1:2, 2:1}.", nivel_dificultad: "Avanzado", xp: 950, codigo_inicial: "", casos_prueba: { expected: "Contado" } },
  { titulo: "A26. Bitwise: AND", descripcion: "Operador &. Calcula 5 & 3 (101 & 011).", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "A27. Bitwise: Shift", descripcion: "Multiplica 2 por 8 usando shift izquierdo (2 << 3).", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "16" } },
  { titulo: "A28. Funciones Puntero", descripcion: "void (*ptr)(int) = &mifunc; Pasa una función como argumento a otra.", nivel_dificultad: "Avanzado", xp: 1100, codigo_inicial: "", casos_prueba: { expected: "Callback C" } },
  { titulo: "A29. std::function", descripcion: "Incluye <functional>. Úsalo como wrapper moderno para callbacks C++11.", nivel_dificultad: "Avanzado", xp: 1200, codigo_inicial: "", casos_prueba: { expected: "Modern Callback" } },
  { titulo: "A30. Hilos Básicos (std::thread)", descripcion: "Incluye <thread>. thread t(funcion). Llama t.join(). C++11.", nivel_dificultad: "Avanzado", xp: 1500, codigo_inicial: "", casos_prueba: { expected: "Multithreading" } }
];

async function main() {
  console.log('Iniciando inyección de la malla curricular para C++ (90 Desafíos)...');
  
  // Limpiar solo los de C++
  await prisma.desafio.deleteMany({
    where: { lenguaje: 'cpp' }
  });  
  
  console.log('Retos antiguos de C++ limpiados. Insertando nuevos...');

  const cppDesafios = cppCurriculum.map(reto => ({
    ...reto,
    lenguaje: 'cpp'
  }));

  const result = await prisma.desafio.createMany({
    data: cppDesafios,
    skipDuplicates: true,
  });
  
  console.log(`✅ ¡Éxito! ${result.count} desafíos de C++ inyectados en la base de datos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });