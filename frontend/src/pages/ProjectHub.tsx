import { useState } from 'react';
import { Terminal, Code2, Globe, Database, ChevronRight, Briefcase, X, Download, CheckCircle2, CheckSquare, Square, Trash2, Lightbulb, BookOpen } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';

// Diccionario de ayudas dinámicas según el lenguaje
const recursosAyuda: Record<string, string[]> = {
  'Python': [
    'Documentación oficial de Python (docs.python.org)',
    'Real Python - Excelentes tutoriales prácticos y visuales',
    'Guía de entornos virtuales (venv) para no mezclar dependencias',
    'PEP 8 - Guía de estilo para escribir código Python limpio'
  ],
  'JavaScript': [
    'MDN Web Docs (Mozilla) - La biblia de JavaScript',
    'JavaScript.info - Guía moderna y detallada',
    'Documentación de NPM para gestión de paquetes (package.json)',
    'Guía sobre Promesas y Async/Await'
  ],
  'Java': [
    'Oracle Java Documentation - Referencia oficial',
    'Baeldung - Los mejores tutoriales y ejemplos de Java',
    'Guía de instalación y configuración de Maven/Gradle',
    'Conceptos de Programación Orientada a Objetos en Java'
  ],
  'C++': [
    'cppreference.com - Referencia técnica completa',
    'LearnCpp.com - Excelente curso estructurado desde cero',
    'Guía básica para crear archivos CMakeLists.txt',
    'Explicación de Punteros y Gestión de Memoria Dinámica'
  ],
  'Dart': [
    'Documentación oficial de Flutter.dev y Dart.dev',
    'Pub.dev - El repositorio oficial de paquetes y librerías',
    'Guía oficial sobre Gestión de Estado (Provider/Riverpod)',
    'Canal de YouTube oficial de Flutter (Widget of the Week)'
  ]
};

const proyectosBase = [
  // --- PYTHON ---
  { 
    id: 1, lenguaje: 'Python', dificultad: 'Principiante', titulo: 'Analizador de Votos Electorales', icono: <Terminal size={24} />, descripcion: 'Un script de consola para procesar archivos de texto con resultados de mesas de votación y generar estadísticas.', 
    pasos: [
      { texto: 'Leer datos de un archivo .txt', tip: 'Usa `with open("votos.txt", "r") as file:` para asegurar que el archivo se cierre correctamente.' },
      { texto: 'Usar diccionarios para sumar votos', tip: '`votos[candidato] = votos.get(candidato, 0) + 1` te salvará de errores de llave no encontrada.' },
      { texto: 'Calcular porcentajes', tip: 'Usa `round((votos_candidato / total) * 100, 2)` para dejar solo dos decimales.' },
      { texto: 'Imprimir reporte', tip: 'Usa f-strings para darle formato: `print(f"El candidato {nombre} obtuvo {porcentaje}%")`.' }
    ] 
  },
  { 
    id: 2, lenguaje: 'Python', dificultad: 'Intermedio', titulo: 'Web Scraper de Precios', icono: <Globe size={24} />, descripcion: 'Construye un script que extraiga precios de productos de tiendas online de retail y te avise si bajan.', 
    pasos: [
      { texto: 'Instalar BeautifulSoup y Requests', tip: 'Ejecuta `pip install beautifulsoup4 requests` en tu terminal.' },
      { texto: 'Analizar el DOM de la página', tip: 'Inspecciona el elemento en tu navegador web y busca su clase CSS (ej. class="price-tag").' },
      { texto: 'Extraer datos', tip: 'Usa `soup.find("span", class_="precio").text` para obtener el string del precio.' },
      { texto: 'Guardar en CSV', tip: 'Usa el módulo nativo `import csv` y su método `csv.writer`.' }
    ] 
  },
  { 
    id: 3, lenguaje: 'Python', dificultad: 'Avanzado', titulo: 'Bot Gestor de Envíos y Logística', icono: <Database size={24} />, descripcion: 'Automatiza la creación de etiquetas y seguimiento de paquetes usando APIs de correos.', 
    pasos: [
      { texto: 'Consumir API REST', tip: 'Usa `requests.get()` pasando tus headers de autorización.' },
      { texto: 'Manejar autenticación OAuth', tip: 'Guarda tu Bearer Token en un archivo `.env` usando la librería `python-dotenv`.' },
      { texto: 'Generar PDFs de etiquetas', tip: 'Revisa la librería `ReportLab` o `pdfkit` para crear los documentos.' },
      { texto: 'Webhooks de estado', tip: 'Usa un framework ligero como Flask o FastAPI para crear el endpoint que reciba el webhook.' }
    ] 
  },

  // --- JAVASCRIPT ---
  { 
    id: 4, lenguaje: 'JavaScript', dificultad: 'Principiante', titulo: 'Generador de Citas de Fantasía', icono: <Globe size={24} />, descripcion: 'Una web app sencilla que muestra citas aleatorias de libros usando manipulación del DOM.', 
    pasos: [
      { texto: 'Estructurar HTML/CSS', tip: 'Crea un contenedor central usando Flexbox (`display: flex; justify-content: center;`).' },
      { texto: 'Crear array de objetos', tip: 'Estructura tus datos así: `const citas = [{texto: "...", autor: "..."}]`.' },
      { texto: 'Añadir EventListeners', tip: 'Selecciona tu botón con `document.getElementById` y aplícale un `.addEventListener("click", funcion)`.' },
      { texto: 'Manipular el DOM', tip: 'Usa `Math.random()` combinado con `Math.floor()` para elegir un índice al azar del array.' }
    ] 
  },
  { 
    id: 5, lenguaje: 'JavaScript', dificultad: 'Intermedio', titulo: 'Bot de Discord Comunitario', icono: <Terminal size={24} />, descripcion: 'Un bot para moderar un servidor, asignar roles automáticamente y responder a comandos personalizados.', 
    pasos: [
      { texto: 'Configurar Discord Developer Portal', tip: 'Asegúrate de activar los "Privileged Gateway Intents" (Message Content) en la web de Discord.' },
      { texto: 'Usar discord.js', tip: 'Instala la librería con `npm install discord.js` e inicia el cliente con intents básicos.' },
      { texto: 'Crear handlers de comandos', tip: 'Separa tus comandos en una carpeta `/commands` y expórtalos como módulos para no saturar tu `index.js`.' },
      { texto: 'Desplegar en servidor', tip: 'Considera usar PM2 o Docker para mantener tu bot encendido 24/7.' }
    ] 
  },
  { 
    id: 6, lenguaje: 'JavaScript', dificultad: 'Avanzado', titulo: 'API RESTful de Tareas', icono: <Database size={24} />, descripcion: 'Crea tu propio backend con Express.js y Node para gestionar un To-Do list real con base de datos.', 
    pasos: [
      { texto: 'Configurar Express', tip: 'Instala express y cors. Inicia el servidor con `app.listen(3000)`.' },
      { texto: 'Crear rutas CRUD', tip: 'Necesitas implementar `app.get`, `app.post`, `app.put` y `app.delete`.' },
      { texto: 'Conectar a PostgreSQL', tip: 'Usa Prisma ORM (`npx prisma init`) para evitar escribir sentencias SQL a mano.' },
      { texto: 'Probar con Postman', tip: 'No olvides configurar Postman para enviar el body en formato crudo (Raw) como JSON.' }
    ] 
  },

  // --- JAVA ---
  { 
    id: 7, lenguaje: 'Java', dificultad: 'Principiante', titulo: 'Gestor de Inventario CLI', icono: <Terminal size={24} />, descripcion: 'Una aplicación de consola aplicando Programación Orientada a Objetos para gestionar stock.', 
    pasos: [
      { texto: 'Crear clase Producto', tip: 'Encapsula los atributos (`private`) y genera los métodos getters y setters.' },
      { texto: 'Implementar Scanner para inputs', tip: 'Usa `Scanner scanner = new Scanner(System.in);` y ten cuidado con el salto de línea al usar `nextLine()`.' },
      { texto: 'Lógica de agregar/vender', tip: 'Usa una colección como `ArrayList<Producto>` para almacenar tu inventario dinámicamente.' },
      { texto: 'Persistencia en .txt', tip: 'Usa `FileWriter` y `BufferedReader` para guardar y cargar los datos al iniciar.' }
    ] 
  },
  { 
    id: 8, lenguaje: 'Java', dificultad: 'Intermedio', titulo: 'Sistema de Control de Gimnasio', icono: <Database size={24} />, descripcion: 'Software para registrar alumnos, renovaciones de mensualidad y asignación de rutinas.', 
    pasos: [
      { texto: 'Diseñar diagrama de clases', tip: 'Aplica herencia: Una clase padre `Usuario` y clases hijas `Alumno` y `Entrenador`.' },
      { texto: 'Herencia y Polimorfismo', tip: 'Sobrescribe métodos específicos usando la anotación `@Override`.' },
      { texto: 'Conexión JDBC', tip: 'Asegúrate de agregar el driver de PostgreSQL o MySQL a las dependencias de tu proyecto (pom.xml si usas Maven).' },
      { texto: 'Manejo de Excepciones', tip: 'Usa bloques `try-catch` para capturar `SQLException` y evitar que el programa crashee.' }
    ] 
  },
  { 
    id: 9, lenguaje: 'Java', dificultad: 'Avanzado', titulo: 'Simulador de Reservas de Cine', icono: <Globe size={24} />, descripcion: 'Sistema concurrente para reservar butacas en salas de cine sin que dos personas compren el mismo asiento.', 
    pasos: [
      { texto: 'Manejo de Threads', tip: 'Cada intento de reserva debe ejecutarse en un nuevo hilo implementando la interfaz `Runnable`.' },
      { texto: 'Sincronización (synchronized)', tip: 'Usa bloques `synchronized` en el método de compra para bloquear el asiento mientras se procesa el pago.' },
      { texto: 'Interfaz gráfica con JavaFX', tip: 'Usa SceneBuilder para diseñar visualmente la matriz de asientos de la sala.' },
      { texto: 'Base de datos relacional', tip: 'Usa transacciones SQL (`COMMIT` y `ROLLBACK`) para garantizar la integridad de la compra.' }
    ] 
  },

  // --- C++ ---
  { 
    id: 10, lenguaje: 'C++', dificultad: 'Principiante', titulo: 'Calculadora de Matrices', icono: <Terminal size={24} />, descripcion: 'Programa matemático para resolver sistemas de ecuaciones, diagonalización y reducción de filas.', 
    pasos: [
      { texto: 'Uso de punteros y referencias', tip: 'Pasa las matrices grandes a las funciones por referencia `const vector<vector<double>>&` para ahorrar memoria.' },
      { texto: 'Sobrecarga de operadores', tip: 'Sobrecarga `operator+` y `operator*` para que sumar matrices sea tan fácil como escribir `A + B`.' },
      { texto: 'Manejo de memoria dinámica', tip: 'Si usas arreglos crudos con `new`, ¡no olvides liberar la memoria con `delete[]`!' },
      { texto: 'Algoritmo de Gauss-Jordan', tip: 'Implementa una función de pivoteo parcial (cambiar filas) para evitar dividir por cero.' }
    ] 
  },
  { 
    id: 11, lenguaje: 'C++', dificultad: 'Intermedio', titulo: 'Simulador de Compuertas Lógicas', icono: <Code2 size={24} />, descripcion: 'Evalúa expresiones de circuitos usando parámetros algebraicos y evalúa salidas booleanas.', 
    pasos: [
      { texto: 'Árboles de expresión', tip: 'Construye un árbol binario donde los nodos son operadores (AND, OR) y las hojas son las variables.' },
      { texto: 'Pilas (Stacks)', tip: 'Usa `std::stack` de la STL para convertir expresiones a notación postfija (Postfix).' },
      { texto: 'Evaluación postfija', tip: 'Recorre la expresión leyendo de izquierda a derecha; si es un valor, apílalo, si es operador, desapila dos, evalúa y apila el resultado.' },
      { texto: 'Clases abstractas', tip: 'Crea una clase base pura `Compuerta` con un método virtual `evaluar() = 0;`.' }
    ] 
  },
  { 
    id: 12, lenguaje: 'C++', dificultad: 'Avanzado', titulo: 'Motor Gráfico 2D Básico', icono: <Globe size={24} />, descripcion: 'Usando la librería SFML, renderiza formas geométricas, sprites y maneja físicas de colisión simples.', 
    pasos: [
      { texto: 'Configurar SFML', tip: 'Enlázalo correctamente en tu CMakeLists o en la configuración del Linker de Visual Studio.' },
      { texto: 'Bucle de juego (Game Loop)', tip: 'Debes tener las fases claras: Procesar Inputs -> Actualizar Lógica -> Limpiar Pantalla -> Dibujar.' },
      { texto: 'Renderizado por frames', tip: 'Multiplica la velocidad de los objetos por el DeltaTime para que el movimiento sea fluido en cualquier PC.' },
      { texto: 'Detección de colisiones (AABB)', tip: 'Axis-Aligned Bounding Box: Compara si los rectángulos (bounds) de dos objetos se superponen.' }
    ] 
  },

  // --- DART (FLUTTER) ---
  { 
    id: 13, lenguaje: 'Dart', dificultad: 'Principiante', titulo: 'App de Notas de Estudio', icono: <Code2 size={24} />, descripcion: 'Aplicación móvil optimizada para tablets donde puedes organizar tus apuntes universitarios por ramos.', 
    pasos: [
      { texto: 'Diseño de UI con Widgets', tip: 'Usa `GridView.builder` para mostrar las notas como tarjetas si estás en formato tablet.' },
      { texto: 'Navegación entre pantallas', tip: 'Usa `Navigator.push` pasando los datos de la nota a la nueva pantalla de edición.' },
      { texto: 'Uso de SharedPreferences', tip: 'Ideal para guardar las notas localmente en formato JSON sin necesitar base de datos externa.' },
      { texto: 'Gestión de estado básico', tip: 'Usa `setState()` para refrescar la lista principal al crear o borrar una nota.' }
    ] 
  },
  { 
    id: 14, lenguaje: 'Dart', dificultad: 'Intermedio', titulo: 'Catálogo de Ropa Deportiva', icono: <Globe size={24} />, descripcion: 'App de e-commerce para una marca de indumentaria. Muestra catálogo, detalles de compresión y carrito.', 
    pasos: [
      { texto: 'Consumo de API REST', tip: 'Usa el paquete `http` de pub.dev y procesa la respuesta con `jsonDecode`.' },
      { texto: 'Manejo de estado con Provider', tip: 'Envuelve tu App en un `MultiProvider` para que el Carrito de Compras sea accesible desde cualquier pantalla.' },
      { texto: 'Animaciones Hero', tip: 'Envuelve la imagen del producto en un widget `Hero` para que transicione suavemente al abrir los detalles.' },
      { texto: 'Validación de formularios', tip: 'Usa un `Form` y `TextFormField` verificando que los campos de dirección de envío no estén vacíos.' }
    ] 
  },
  { 
    id: 15, lenguaje: 'Dart', dificultad: 'Avanzado', titulo: 'App de Delivery de Sushi', icono: <Database size={24} />, descripcion: 'Aplicación completa con geolocalización, integración de mapas y pasarela de pago simulada.', 
    pasos: [
      { texto: 'Integrar Google Maps API', tip: 'Añade el paquete `google_maps_flutter` y recuerda habilitar los SDK de Android e iOS en la consola de Google Cloud.' },
      { texto: 'Firebase Authentication', tip: 'Permite inicio de sesión rápido con Google Sign-In para no obligar a crear cuentas.' },
      { texto: 'Cloud Firestore', tip: 'Estructura tus colecciones: `/Restaurantes`, `/Usuarios` y `/Pedidos`.' },
      { texto: 'Notificaciones Push', tip: 'Usa Firebase Cloud Messaging (FCM) para avisarle al usuario cuando su pedido esté en camino.' }
    ] 
  }
];

export const ProjectHub = () => {
  const [filtro, setFiltro] = useState('Todos');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<any>(null);
  const [tipAbierto, setTipAbierto] = useState<string | null>(null);
  const [mostrarApoyo, setMostrarApoyo] = useState(false); // NUEVO ESTADO PARA VER RECURSOS
  
  const { proyectosActivos, aceptarProyecto, togglePaso, abandonarProyecto } = useProjectStore();

  const filtrados = filtro === 'Todos' ? proyectosBase : proyectosBase.filter(p => p.lenguaje === filtro);

  const handleAceptarDesafio = () => {
    aceptarProyecto(proyectoSeleccionado);
    setProyectoSeleccionado(null);
    setMostrarApoyo(false);
  };

  const handleCerrarModal = () => {
    setProyectoSeleccionado(null);
    setMostrarApoyo(false);
  };

  const toggleTip = (id: string) => {
    setTipAbierto(prev => prev === id ? null : id);
  };

  return (
    <div className="animate-fade-in space-y-8 pb-8 relative">
      
      {/* MODAL DEL KIT DE PROYECTO */}
      {proyectoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-onyx-card border border-onyx-mint/30 w-full max-w-2xl rounded-2xl shadow-[0_0_40px_rgba(167,255,235,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header del Modal */}
            <div className="bg-onyx-dark p-6 border-b border-onyx-mint/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-onyx-mint/10 rounded-xl flex items-center justify-center text-onyx-mint border border-onyx-mint/20">
                  {proyectoSeleccionado.icono}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{proyectoSeleccionado.titulo}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-widest bg-onyx-mint/10 text-onyx-mint px-2 py-0.5 rounded-full font-bold">{proyectoSeleccionado.lenguaje}</span>
                    <span className="text-[10px] uppercase tracking-widest bg-onyx-light/10 text-onyx-light/70 px-2 py-0.5 rounded-full font-bold">{proyectoSeleccionado.dificultad}</span>
                  </div>
                </div>
              </div>
              <button onClick={handleCerrarModal} className="text-onyx-light/50 hover:text-onyx-mint transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Contenido del Modal Dinámico */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
              <div>
                <h4 className="text-sm font-bold text-onyx-light/40 uppercase mb-2">Misión del Proyecto</h4>
                <p className="text-onyx-light/80 leading-relaxed">{proyectoSeleccionado.descripcion}</p>
              </div>

              {mostrarApoyo ? (
                // VISTA DE MATERIAL DE APOYO
                <div className="bg-[#121212] rounded-xl border border-onyx-mint/10 p-5 animate-fade-in">
                  <h4 className="text-sm font-bold text-onyx-mint flex items-center gap-2 mb-4">
                    <BookOpen size={16} /> Recursos y Guías para {proyectoSeleccionado.lenguaje}
                  </h4>
                  <ul className="space-y-3">
                    {recursosAyuda[proyectoSeleccionado.lenguaje]?.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-onyx-light/70">
                        <CheckCircle2 size={18} className="text-onyx-mint/50 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-onyx-light/40 mt-4 italic">* Próximamente se integrará acceso directo a documentación en video y tutoría IA.</p>
                </div>
              ) : (
                // VISTA DE KIT DE INICIO (Original)
                <div className="bg-[#121212] rounded-xl border border-onyx-mint/10 p-5 animate-fade-in">
                  <h4 className="text-sm font-bold text-onyx-mint flex items-center gap-2 mb-4">
                    <Download size={16} /> Kit de Inicio Recomendado
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-onyx-light/70">
                      <CheckCircle2 size={18} className="text-onyx-mint/50 shrink-0 mt-0.5" />
                      <span><strong>Estructura Base:</strong> Crea una carpeta vacía y un buen archivo README.md explicando el proyecto.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-onyx-light/70">
                      <CheckCircle2 size={18} className="text-onyx-mint/50 shrink-0 mt-0.5" />
                      <span><strong>Dependencias:</strong> Asegúrate de instalar las herramientas mencionadas en el primer paso del roadmap.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-onyx-light/70">
                      <CheckCircle2 size={18} className="text-onyx-mint/50 shrink-0 mt-0.5" />
                      <span><strong>Entorno:</strong> Te recomendamos usar VS Code localmente para este proyecto en lugar del Sandbox web.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Footer del Modal con el Botón Actualizado */}
            <div className="p-6 bg-onyx-dark/50 border-t border-onyx-mint/10 flex gap-4">
              <button 
                onClick={() => setMostrarApoyo(!mostrarApoyo)}
                className="flex-1 bg-onyx-dark border border-onyx-mint/20 text-onyx-mint font-bold py-3 rounded-xl hover:bg-onyx-mint/10 transition-all flex justify-center items-center gap-2"
              >
                <BookOpen size={20} /> {mostrarApoyo ? 'Ocultar Guías' : 'Material de Apoyo'}
              </button>
              
              <button 
                onClick={handleAceptarDesafio}
                disabled={proyectosActivos.some(p => p.id === proyectoSeleccionado.id)}
                className="flex-1 bg-onyx-mint text-onyx-dark font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(167,255,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
              >
                {proyectosActivos.some(p => p.id === proyectoSeleccionado.id) ? 'Desafío Activo' : 'Aceptar Desafío'} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <header>
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Briefcase className="text-onyx-mint" size={32} /> Project Hub
        </h2>
        <p className="text-onyx-light/50 mt-2">Da el salto al mundo real. Elige un proyecto, sigue la guía y construye tu portafolio.</p>
      </header>

      {/* TRACKER */}
      {proyectosActivos.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-onyx-mint/20 pb-2">Mis Proyectos Activos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proyectosActivos.map((proyecto) => (
              <div key={proyecto.id} className="bg-onyx-card border-l-4 border-l-onyx-mint border-y border-r border-onyx-mint/20 rounded-r-2xl p-6 shadow-lg relative overflow-hidden">
                <button 
                  onClick={() => abandonarProyecto(proyecto.id)}
                  className="absolute top-4 right-4 text-onyx-light/30 hover:text-red-400 transition-colors"
                  title="Abandonar proyecto"
                >
                  <Trash2 size={18} />
                </button>
                
                <h4 className="text-lg font-bold text-white mb-1">{proyecto.titulo}</h4>
                <p className="text-xs text-onyx-mint mb-4">{proyecto.lenguaje}</p>
                
                <div className="w-full bg-onyx-dark rounded-full h-2.5 mb-4 border border-onyx-mint/10">
                  <div 
                    className="bg-onyx-mint h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${proyecto.progreso}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs text-onyx-light/50 font-mono mb-4">{proyecto.progreso}% Completado</p>

                <div className="space-y-4">
                  {proyecto.pasos.map((paso, index) => {
                    const tipId = `${proyecto.id}-${index}`;
                    return (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div 
                            onClick={() => togglePaso(proyecto.id, index)}
                            className={`flex items-start gap-3 cursor-pointer group flex-1 transition-colors p-2 rounded-lg hover:bg-onyx-dark/50 ${paso.completado ? 'opacity-50' : ''}`}
                          >
                            {paso.completado ? (
                              <CheckSquare size={20} className="text-onyx-mint shrink-0 mt-0.5" />
                            ) : (
                              <Square size={20} className="text-onyx-light/40 group-hover:text-onyx-mint shrink-0 mt-0.5 transition-colors" />
                            )}
                            <span className={`text-sm ${paso.completado ? 'line-through text-onyx-light/50' : 'text-onyx-light/80'}`}>
                              {paso.texto}
                            </span>
                          </div>

                          {paso.tip && (
                            <button 
                              onClick={() => toggleTip(tipId)} 
                              className={`p-1.5 rounded-lg transition-colors shrink-0 mt-1.5 ${tipAbierto === tipId ? 'bg-onyx-mint text-onyx-dark' : 'bg-onyx-dark text-yellow-400/70 hover:bg-white/10 hover:text-yellow-400'}`}
                              title="Ver pista"
                            >
                              <Lightbulb size={16} />
                            </button>
                          )}
                        </div>

                        {tipAbierto === tipId && paso.tip && (
                          <div className="ml-10 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg animate-fade-in">
                            <p className="text-xs text-yellow-100/90 leading-relaxed">
                              <strong className="text-yellow-400">💡 Tip de Onyx:</strong> {paso.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FILTROS */}
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
        {['Todos', 'Python', 'JavaScript', 'Java', 'C++', 'Dart'].map(lang => (
          <button 
            key={lang} onClick={() => setFiltro(lang)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filtro === lang ? 'bg-onyx-mint text-onyx-dark shadow-[0_0_15px_rgba(167,255,235,0.4)]' : 'bg-onyx-card text-onyx-light/60 hover:text-onyx-mint border border-onyx-mint/10'}`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* CATÁLOGO DE PROYECTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtrados.map(proyecto => (
          <div key={proyecto.id} className="bg-onyx-card border border-onyx-mint/10 rounded-2xl p-6 hover:border-onyx-mint/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-onyx-dark rounded-xl text-onyx-mint border border-onyx-mint/10 group-hover:scale-110 transition-transform">
                {proyecto.icono}
              </div>
              <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold
                ${proyecto.dificultad === 'Principiante' ? 'bg-green-500/10 text-green-400' : proyecto.dificultad === 'Intermedio' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}
              >
                {proyecto.dificultad}
              </span>
            </div>
            
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-bold text-onyx-light/40 border border-onyx-light/10 px-2 py-0.5 rounded uppercase">{proyecto.lenguaje}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-white">{proyecto.titulo}</h3>
            <p className="text-sm text-onyx-light/60 mb-6 flex-1">{proyecto.descripcion}</p>

            <button 
              onClick={() => setProyectoSeleccionado(proyecto)}
              className="w-full bg-onyx-dark border border-onyx-mint/20 text-onyx-mint font-bold py-3 rounded-xl hover:bg-onyx-mint hover:text-onyx-dark transition-all flex justify-center items-center gap-2 mt-auto group-hover:shadow-[0_0_20px_rgba(167,255,235,0.2)]"
            >
              Ver Kit de Proyecto <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};