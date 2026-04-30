import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

declare const process: any;

const dartCurriculum = [
  // --- NIVEL PRINCIPIANTE (30 Desafíos - Sintaxis, Tipos y Null Safety Básico) ---
  { titulo: "P1. Hola Dart", descripcion: "Crea la función void main() e imprime 'Hola Dart'.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Hola Dart" } },
  { titulo: "P2. Variables y Tipos", descripcion: "Declara un int a = 5 y un double b = 2.5. Imprime la suma.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "7.5" } },
  { titulo: "P3. Interpolación de Strings", descripcion: "String nombre='Francisco'. Imprime 'Hola $nombre'.", nivel_dificultad: "Principiante", xp: 50, codigo_inicial: "", casos_prueba: { expected: "Hola Francisco" } },
  { titulo: "P4. Interpolación de Expresiones", descripcion: "Imprime la suma de 2+2 dentro de un string usando ${2+2}.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "4" } },
  { titulo: "P5. Var vs Dynamic", descripcion: "Declara dynamic x = 10; luego x = 'A'; Imprime x.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "A" } },
  { titulo: "P6. Final vs Const", descripcion: "Declara final nombre = 'Onyx'. Intenta cambiarlo (mentalmente) e imprime 'Onyx'.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "Onyx" } },
  { titulo: "P7. División Entera", descripcion: "En Dart 10/3 da double. Usa 10 ~/ 3 para división entera.", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "3" } },
  { titulo: "P8. Métodos de String", descripcion: "Convierte 'flutter' a mayúsculas usando .toUpperCase().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "FLUTTER" } },
  { titulo: "P9. Contains", descripcion: "Imprime si 'Onyx Study' contiene 'Study' usando .contains().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "true" } },
  { titulo: "P10. Parsear a Int", descripcion: "Convierte el string '42' a int usando int.parse().", nivel_dificultad: "Principiante", xp: 60, codigo_inicial: "", casos_prueba: { expected: "42" } },
  { titulo: "P11. Parsear a Double", descripcion: "Convierte '3.14' a double usando double.parse().", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "3.14" } },
  { titulo: "P12. Listas Básicas", descripcion: "Crea List<int> nums = [1, 2, 3]; Imprime el primer elemento.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "1" } },
  { titulo: "P13. Añadir a Lista", descripcion: "Usa .add(4) en la lista [1,2,3] e imprímela.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3, 4]" } },
  { titulo: "P14. Longitud de Lista", descripcion: "Imprime la cantidad de elementos en [10, 20] usando .length.", nivel_dificultad: "Principiante", xp: 70, codigo_inicial: "", casos_prueba: { expected: "2" } },
  { titulo: "P15. Eliminar de Lista", descripcion: "Usa .removeAt(0) en [10, 20, 30]. Imprime lista resultante.", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "[20, 30]" } },
  { titulo: "P16. Sets (Conjuntos)", descripcion: "Crea Set<int> nums = {1, 1, 2}; Imprime el Set (sin duplicados).", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "{1, 2}" } },
  { titulo: "P17. Maps (Diccionarios)", descripcion: "Crea Map<String, int> edades = {'F': 21}; Imprime edades['F'].", nivel_dificultad: "Principiante", xp: 80, codigo_inicial: "", casos_prueba: { expected: "21" } },
  { titulo: "P18. Añadir a Map", descripcion: "Añade map['B'] = 10 a {'A': 5}. Imprime map['B'].", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "10" } },
  { titulo: "P19. If / Else", descripcion: "Si 10 > 5 imprime 'Mayor', si no 'Menor'.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "Mayor" } },
  { titulo: "P20. Operador Ternario", descripcion: "Usa (10 % 2 == 0) ? 'Par' : 'Impar'. Imprime resultado.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "Par" } },
  { titulo: "P21. Bucle For Tradicional", descripcion: "Itera del 1 al 3 usando for (int i=1; i<=3; i++).", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "1\n2\n3" } },
  { titulo: "P22. For...in", descripcion: "Recorre [1, 2] con for (var x in lista) e imprime x.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "1\n2" } },
  { titulo: "P23. While Básico", descripcion: "x=2. Mientras x>0, imprime x y x--.", nivel_dificultad: "Principiante", xp: 90, codigo_inicial: "", casos_prueba: { expected: "2\n1" } },
  { titulo: "P24. Función Básica", descripcion: "Crea int suma(int a, int b) { return a+b; }. Llama e imprime.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Suma ok" } },
  { titulo: "P25. Arrow Functions Dart", descripcion: "Convierte a sintaxis corta: int suma(a, b) => a + b; Imprime (2,3).", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "5" } },
  { titulo: "P26. Parámetros Nombrados", descripcion: "Haz void saludar({String nombre}) y llámala con saludar(nombre: 'A').", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "A" } },
  { titulo: "P27. Parámetros Opcionales []", descripcion: "Haz void saludo(String a, [String? b]). Llama saludo('A').", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Opcional ok" } },
  { titulo: "P28. Parámetros Required", descripcion: "Usa required String nombre en un parámetro nombrado.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Required ok" } },
  { titulo: "P29. Null Safety: Operador ?", descripcion: "String? nombre; Imprime nombre?.length (debe dar null).", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "null" } },
  { titulo: "P30. Operador ??", descripcion: "String? n; Imprime n ?? 'Anonimo'.", nivel_dificultad: "Principiante", xp: 100, codigo_inicial: "", casos_prueba: { expected: "Anonimo" } },

  // --- NIVEL INTERMEDIO (30 Desafíos - Iterable, POO, Cascada y Colecciones) ---
  { titulo: "I1. Clases Básicas", descripcion: "Crea class Persona { String nombre; Persona(this.nombre); }. Instancia.", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "Persona ok" } },
  { titulo: "I2. Constructor Nombrado", descripcion: "Crea Persona.invitado() { nombre = 'Inv'; }. Instancíalo.", nivel_dificultad: "Intermedio", xp: 150, codigo_inicial: "", casos_prueba: { expected: "Inv" } },
  { titulo: "I3. Operador Cascada (..)", descripcion: "Instancia Persona y usa ..nombre = 'X' ..edad = 20. Imprime.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "Cascada ok" } },
  { titulo: "I4. Getters", descripcion: "Usa String get nombreMayus => nombre.toUpperCase();.", nivel_dificultad: "Intermedio", xp: 160, codigo_inicial: "", casos_prueba: { expected: "Getter ok" } },
  { titulo: "I5. Setters", descripcion: "Usa set edad(int val) para validar val > 0.", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "Setter ok" } },
  { titulo: "I6. Factory Constructors", descripcion: "Usa factory Persona.fromJson(Map json) para crear instancia.", nivel_dificultad: "Intermedio", xp: 170, codigo_inicial: "", casos_prueba: { expected: "Factory ok" } },
  { titulo: "I7. Iterable: forEach", descripcion: "[1,2].forEach((n) => print(n));", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "1\n2" } },
  { titulo: "I8. Iterable: map", descripcion: "Usa .map((n) => n*2).toList() en [1,2,3].", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "[2, 4, 6]" } },
  { titulo: "I9. Iterable: where", descripcion: "Filtra pares con .where((n) => n % 2 == 0).toList().", nivel_dificultad: "Intermedio", xp: 180, codigo_inicial: "", casos_prueba: { expected: "[2, 4]" } },
  { titulo: "I10. Iterable: reduce", descripcion: "Suma [1,2,3] con .reduce((a, b) => a + b).", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "6" } },
  { titulo: "I11. Iterable: fold", descripcion: "Usa .fold(10, (a, b) => a + b) en [1,2,3]. (Inicia en 10).", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "16" } },
  { titulo: "I12. Iterable: any", descripcion: "Verifica si hay algun negativo en [1, -2, 3] con .any().", nivel_dificultad: "Intermedio", xp: 190, codigo_inicial: "", casos_prueba: { expected: "true" } },
  { titulo: "I13. Iterable: every", descripcion: "Verifica si todos son pares en [2, 4, 6] con .every().", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "true" } },
  { titulo: "I14. Collection If", descripcion: "Crea lista [1, 2, if (true) 3]. Imprime.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3]" } },
  { titulo: "I15. Collection For", descripcion: "Crea lista [1, for (var i in [2,3]) i]. Imprime.", nivel_dificultad: "Intermedio", xp: 200, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3]" } },
  { titulo: "I16. Spread Operator (...)", descripcion: "Une [1,2] y [3,4] usando [...a, ...b].", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "[1, 2, 3, 4]" } },
  { titulo: "I17. Null-aware Spread (...?)", descripcion: "List? a = null; Une [1, ...?a]. Evita error.", nivel_dificultad: "Intermedio", xp: 210, codigo_inicial: "", casos_prueba: { expected: "[1]" } },
  { titulo: "I18. Late keyword", descripcion: "Declara late String dato; Asigna 'A' e imprime.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "A" } },
  { titulo: "I19. Try / Catch", descripcion: "Usa try { int.parse('A'); } catch (e) { print('Error'); }.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "Error" } },
  { titulo: "I20. On Exception", descripcion: "Atrapa error específico on FormatException { print('Formato'); }.", nivel_dificultad: "Intermedio", xp: 220, codigo_inicial: "", casos_prueba: { expected: "Formato" } },
  { titulo: "I21. Throw", descripcion: "Lanza throw Exception('Fallo'); Atrapa e imprime.", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "Exception: Fallo" } },
  { titulo: "I22. Funciones Anónimas", descripcion: "Asigna una función a variable: var f = (int x) => x*2; Imprime f(4).", nivel_dificultad: "Intermedio", xp: 230, codigo_inicial: "", casos_prueba: { expected: "8" } },
  { titulo: "I23. Limit Brake: Descuento Map", descripcion: "Mapea lista de precios y reduce 10% a cada uno.", nivel_dificultad: "Intermedio", xp: 240, codigo_inicial: "", casos_prueba: { expected: "Precios con Descuento" } },
  { titulo: "I24. Limit Brake: Filtrar Stock", descripcion: "Usa where() para obtener solo productos con stock > 0.", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "Productos Disponibles" } },
  { titulo: "I25. Clases: Extends (Herencia)", descripcion: "class Gato extends Animal. Sobrescribe hacerSonido().", nivel_dificultad: "Intermedio", xp: 250, codigo_inicial: "", casos_prueba: { expected: "Miau" } },
  { titulo: "I26. Super() constructor", descripcion: "Llama a super(nombre) desde el constructor del hijo.", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "Herencia de Propiedades" } },
  { titulo: "I27. Override", descripcion: "Añade @override sobre la función sobrescrita.", nivel_dificultad: "Intermedio", xp: 260, codigo_inicial: "", casos_prueba: { expected: "Override Correcto" } },
  { titulo: "I28. Clases Abstractas", descripcion: "abstract class Forma. No puede ser instanciada, solo heredada.", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "Clase Abstracta ok" } },
  { titulo: "I29. Interfaces (Implements)", descripcion: "En Dart toda clase es interfaz. Usa implements Persona.", nivel_dificultad: "Intermedio", xp: 270, codigo_inicial: "", casos_prueba: { expected: "Interfaz Implementada" } },
  { titulo: "I30. Sort con Comparator", descripcion: "Ordena [10, 2, 5] con .sort((a,b) => a.compareTo(b)).", nivel_dificultad: "Intermedio", xp: 280, codigo_inicial: "", casos_prueba: { expected: "[2, 5, 10]" } },

  // --- NIVEL AVANZADO (30 Desafíos - Async, Streams, Mixins y Flutter Prep) ---
  { titulo: "A1. Future Básico", descripcion: "Crea Future.value('A'). Imprime usando .then().", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "A" } },
  { titulo: "A2. Async / Await", descripcion: "Haz async una función e imprime el await de un Future.delayed.", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Delay superado" } },
  { titulo: "A3. Future.delayed", descripcion: "Espera 1 segundo con Future.delayed(Duration(seconds: 1)).", nivel_dificultad: "Avanzado", xp: 400, codigo_inicial: "", casos_prueba: { expected: "Tiempo Cumplido" } },
  { titulo: "A4. Future.wait", descripcion: "Corre dos Futures al mismo tiempo con Future.wait([f1, f2]).", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "[Res1, Res2]" } },
  { titulo: "A5. Future Error Catching", descripcion: "Atrapa un error asíncrono con try/catch alrededor de un await.", nivel_dificultad: "Avanzado", xp: 450, codigo_inicial: "", casos_prueba: { expected: "Error Atrapado" } },
  { titulo: "A6. Mixins", descripcion: "Crea mixin Volador { void volar() } y úsalo con 'with Volador'.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "Volando" } },
  { titulo: "A7. Mixin en Múltiples Clases", descripcion: "Usa el mixin Nadador en Pato y Pez.", nivel_dificultad: "Avanzado", xp: 480, codigo_inicial: "", casos_prueba: { expected: "Nadando" } },
  { titulo: "A8. Extension Methods", descripcion: "Extiende String: extension Ex on String { String cap() => ... }.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Extensión aplicada" } },
  { titulo: "A9. Generics (T)", descripcion: "Crea clase Caja<T> que guarde cualquier tipo de dato.", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Caja<int> ok" } },
  { titulo: "A10. Funciones Genéricas", descripcion: "T primerElemento<T>(List<T> lista) => lista[0];", nivel_dificultad: "Avanzado", xp: 500, codigo_inicial: "", casos_prueba: { expected: "Genérico funciona" } },
  { titulo: "A11. Typedef", descripcion: "typedef Operacion = int Function(int, int). Úsalo como parámetro.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Typedef invocado" } },
  { titulo: "A12. Callable Classes", descripcion: "Sobrescribe call() en una clase para usar obj() como función.", nivel_dificultad: "Avanzado", xp: 550, codigo_inicial: "", casos_prueba: { expected: "Clase llamada" } },
  { titulo: "A13. Assertions", descripcion: "Usa assert(x > 0, 'Debe ser positivo'). (Solo funciona en debug).", nivel_dificultad: "Avanzado", xp: 600, codigo_inicial: "", casos_prueba: { expected: "Assert ok" } },
  { titulo: "A14. Streams Básicos", descripcion: "Crea un Stream.fromIterable([1,2,3]). Usa .listen((v) => print(v)).", nivel_dificultad: "Avanzado", xp: 650, codigo_inicial: "", casos_prueba: { expected: "1\n2\n3" } },
  { titulo: "A15. Async* y yield", descripcion: "Crea un generador asíncrono con async* y emite valores con yield.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Generador de Stream" } },
  { titulo: "A16. StreamController", descripcion: "Instancia StreamController, añade datos con .sink.add y escúchalos.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Controller Ok" } },
  { titulo: "A17. await for (Streams)", descripcion: "Lee un Stream usando un bucle 'await for (var num in stream)'.", nivel_dificultad: "Avanzado", xp: 700, codigo_inicial: "", casos_prueba: { expected: "Leído secuencialmente" } },
  { titulo: "A18. RxDart Map Simulado", descripcion: "Transfroma un Stream usando .map() antes de escucharlo.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "Stream Transformado" } },
  { titulo: "A19. Isolates (Concepto)", descripcion: "Comprende que Dart corre en 1 hilo. Para cálculos pesados usa Isolates.", nivel_dificultad: "Avanzado", xp: 750, codigo_inicial: "", casos_prueba: { expected: "Multithreading Dart" } },
  { titulo: "A20. JSON Decode", descripcion: "import 'dart:convert'; Usa jsonDecode('{\"x\":1}').", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: "Map generado" } },
  { titulo: "A21. JSON Encode", descripcion: "Usa jsonEncode({'A': 10}).", nivel_dificultad: "Avanzado", xp: 800, codigo_inicial: "", casos_prueba: { expected: '{"A":10}' } },
  { titulo: "A22. POO: copyWith", descripcion: "Implementa el patrón copyWith para duplicar objetos inmutables.", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "Objeto Clonado" } },
  { titulo: "A23. Equatable (Sobrecarga ==)", descripcion: "Sobrescribe operator == y hashCode para comparar objetos por valor.", nivel_dificultad: "Avanzado", xp: 850, codigo_inicial: "", casos_prueba: { expected: "Objetos Iguales" } },
  { titulo: "A24. Patrón Singleton", descripcion: "Crea una clase que solo permita 1 instancia usando un constructor privado y factory.", nivel_dificultad: "Avanzado", xp: 900, codigo_inicial: "", casos_prueba: { expected: "Instancia Única" } },
  { titulo: "A25. Patrón Repository", descripcion: "Crea clase interfaz Repository y clase concreta ApiRepository.", nivel_dificultad: "Avanzado", xp: 950, codigo_inicial: "", casos_prueba: { expected: "Repository Implementado" } },
  { titulo: "A26. Búsqueda Binaria Dart", descripcion: "Implementa búsqueda binaria en una List<int>.", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "Índice encontrado" } },
  { titulo: "A27. Merge Sort Dart", descripcion: "Implementa Merge Sort recursivo usando sublist().", nivel_dificultad: "Avanzado", xp: 1000, codigo_inicial: "", casos_prueba: { expected: "Lista Ordenada" } },
  { titulo: "A28. Manejo de Fechas", descripcion: "DateTime.now(). Calcula diferencia con otra fecha usando .difference().", nivel_dificultad: "Avanzado", xp: 1100, codigo_inicial: "", casos_prueba: { expected: "Duration obtenida" } },
  { titulo: "A29. RegExp", descripcion: "Usa RegExp(r'^[a-z]+$').hasMatch('hola') para validar texto.", nivel_dificultad: "Avanzado", xp: 1200, codigo_inicial: "", casos_prueba: { expected: "true" } },
  { titulo: "A30. Algoritmo Dos Punteros", descripcion: "Encuentra dos números que sumen X en una lista ordenada.", nivel_dificultad: "Avanzado", xp: 1500, codigo_inicial: "", casos_prueba: { expected: "Pares Encontrados" } }
];

async function main() {
  console.log('Iniciando inyección de la malla curricular para DART (90 Desafíos)...');
  
  await prisma.desafio.deleteMany({
    where: { lenguaje: 'dart' }
  });  
  
  console.log('Retos antiguos de Dart limpiados. Insertando nuevos...');

  const dartDesafios = dartCurriculum.map(reto => ({
    ...reto,
    lenguaje: 'dart'
  }));

  const result = await prisma.desafio.createMany({
    data: dartDesafios,
    skipDuplicates: true,
  });
  
  console.log(`✅ ¡Éxito! ${result.count} desafíos de DART inyectados en la base de datos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });