import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { 
  Play, Code2, Terminal, Download, 
  Check, BookOpen, FileText, HelpCircle, ExternalLink, X, Copy, Camera, Sparkles
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const BOILERPLATES: Record<string, string> = {
  java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("¡Hola Onyx Study!");\n  }\n}',
  javascript: 'console.log("¡Hola Onyx Study!");',
  python: 'print("¡Hola Onyx Study!")',
  cpp: '#include <iostream>\nint main() {\n  std::cout << "¡Hola Onyx Study!" << std::endl;\n  return 0;\n}',
  dart: 'void main() {\n  print("¡Hola Onyx Study!");\n}'
};

const DOCS_LINKS: Record<string, string> = {
  java: 'https://docs.oracle.com/en/java/',
  javascript: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
  python: 'https://docs.python.org/3/',
  cpp: 'https://en.cppreference.com/w/',
  dart: 'https://dart.dev/guides'
};

const CHEATSHEETS: Record<string, { id: string; titulo: string; codigo: string }[]> = {
  java: [
    { id: 'j1', titulo: 'Imprimir', codigo: 'System.out.println("Texto");' },
    { id: 'j2', titulo: 'Bucle For', codigo: 'for (int i = 0; i < 5; i++) {\n    // lógica\n}' },
    { id: 'j3', titulo: 'Declarar Array', codigo: 'int[] numeros = {1, 2, 3};' },
  ],
  javascript: [
    { id: 'js1', titulo: 'Imprimir', codigo: 'console.log("Texto");' },
    { id: 'js2', titulo: 'Función Flecha', codigo: 'const sumar = (a, b) => a + b;' },
    { id: 'js3', titulo: 'Bucle For...of', codigo: 'for (const item of array) {\n    // lógica\n}' },
  ],
  python: [
    { id: 'p1', titulo: 'Imprimir', codigo: 'print("Texto")' },
    { id: 'p2', titulo: 'Definir Función', codigo: 'def saludar(nombre):\n    return f"Hola {nombre}"' },
    { id: 'p3', titulo: 'Bucle For', codigo: 'for i in range(5):\n    print(i)' },
  ],
  cpp: [
    { id: 'c1', titulo: 'Imprimir', codigo: 'std::cout << "Texto" << std::endl;' },
    { id: 'c2', titulo: 'Vector (Array dinámico)', codigo: '#include <vector>\nstd::vector<int> nums = {1, 2, 3};' },
    { id: 'c3', titulo: 'Bucle For', codigo: 'for (int i = 0; i < 5; i++) {\n    // lógica\n}' },
  ],
  dart: [
    { id: 'd1', titulo: 'Imprimir', codigo: 'print("Texto");' },
    { id: 'd2', titulo: 'Función', codigo: 'String saludar(String nombre) {\n  return "Hola $nombre";\n}' },
    { id: 'd3', titulo: 'Lista', codigo: 'List<int> numeros = [1, 2, 3];' },
  ]
};

export const Sandbox = () => {
  const [lenguaje, setLenguaje] = useState('java');
  const [codigo, setCodigo] = useState(BOILERPLATES['java']);
  const [consola, setConsola] = useState('Esperando ejecución...');
  const [descargado, setDescargado] = useState(false);
  const [tabActiva, setTabActiva] = useState<'guia' | 'boveda' | 'docs'>('docs');
  
  // Estados para las nuevas Features
  const [isCapturing, setIsCapturing] = useState(false);
  const [errorDetectado, setErrorDetectado] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  // Estados Bóveda
  const [misDocs, setMisDocs] = useState([]);
  const [docSeleccionado, setDocSeleccionado] = useState<any>(null);
  const [copiadoId, setCopiadoId] = useState<string | null>(null);
  
  const token = useAuthStore((state) => state.token);
  const editorRef = useRef<any>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMyDocs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documentos/mis-documentos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMisDocs(res.data);
      } catch (err) {
        console.error("Error al cargar apuntes en sandbox", err);
      }
    };
    fetchMyDocs();
  }, [token]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevo = e.target.value;
    setLenguaje(nuevo);
    setCodigo(BOILERPLATES[nuevo]);
    setConsola(`Entorno cambiado a ${nuevo.toUpperCase()}.`);
    setErrorDetectado(false);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => descargarArchivo());
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => handleRunCode());
  };

  const handleRunCode = async () => {
    setConsola(`[${new Date().toLocaleTimeString()}] Iniciando compilación de ${lenguaje.toUpperCase()}...\nContactando servidor...`);
    setErrorDetectado(false);
    
    try {
      const res = await axios.post('http://localhost:5000/api/ejecucion/run', {
        codigo,
        lenguaje
      });

      const out = res.data.output;
      const metrics = `\n--- \nMemoria: ${res.data.memory || 0} KB | Tiempo: ${res.data.cpuTime || 0}s`;
      
      setConsola(`[${new Date().toLocaleTimeString()}] Ejecución completada:\n\n${out}${metrics}`);
      
      // Detección simple de errores
      const lowerOut = out.toLowerCase();
      if (lowerOut.includes('error') || lowerOut.includes('exception') || lowerOut.includes('traceback')) {
        setErrorDetectado(true);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Error de conexión con el compilador.';
      setConsola(`[${new Date().toLocaleTimeString()}] ERROR:\n\n${errorMsg}`);
      setErrorDetectado(true);
    }
  };

  // NUEVA FEATURE: IA Lite
  const handleExplicarError = async () => {
    setIsExplaining(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ejecucion/explicar', { errorText: consola, lenguaje });
      setConsola(prev => prev + `\n\n✨ [Onyx IA Lite]: ${res.data.explicacion}`);
      setErrorDetectado(false); // Ocultar botón tras explicar
    } catch (error) {
      setConsola(prev => prev + `\n\n✨ [Onyx IA Lite]: No pude analizar el error, intenta revisar la sintaxis base.`);
    } finally {
      setIsExplaining(false);
    }
  };

  // NUEVA FEATURE: Captura Estilo Carbon
  const handleCapturarPantalla = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(captureRef.current, { backgroundColor: '#18181b', quality: 0.95 });
      const link = document.createElement('a');
      link.download = `onyx-snippet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error capturando pantalla', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const descargarArchivo = () => {
    const blob = new Blob([codigo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `main.${lenguaje === 'python' ? 'py' : lenguaje === 'javascript' ? 'js' : lenguaje}`;
    link.href = url;
    link.click();
    setDescargado(true);
    setTimeout(() => setDescargado(false), 2000);
  };

  const copiarAlPortapapeles = (id: string, texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiadoId(id);
    setTimeout(() => setCopiadoId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-fade-in -m-4 md:-m-8 relative">
      {/* Header */}
      <div className="bg-onyx-card border-b border-onyx-mint/10 p-4 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-4">
          <div className="bg-onyx-mint/10 p-2 rounded-lg text-onyx-mint hidden md:block">
            <Code2 size={20} />
          </div>
          <select 
            value={lenguaje} 
            onChange={handleLanguageChange}
            className="bg-onyx-dark border border-onyx-mint/20 rounded-xl px-4 py-2 text-sm font-semibold text-onyx-light focus:outline-none focus:border-onyx-mint/50 transition-all cursor-pointer"
          >
            <option value="java">Java 17</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ 20</option>
            <option value="dart">Dart</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          {/* Botón de Captura de Pantalla */}
          <button 
            onClick={handleCapturarPantalla} 
            disabled={isCapturing}
            title="Exportar código como imagen"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-onyx-mint/20 text-onyx-light/70 hover:bg-onyx-mint/10 hover:text-onyx-mint transition-all"
          >
            <Camera size={18} className={isCapturing ? 'animate-pulse' : ''} />
          </button>

          <button onClick={descargarArchivo} className={`flex items-center gap-2 px-4 h-10 rounded-lg border transition-all ${descargado ? 'border-onyx-mint text-onyx-mint' : 'border-onyx-mint/20 text-onyx-light/70 hover:bg-onyx-mint/5'}`}>
            {descargado ? <Check size={18} /> : <Download size={18} />}
            <span className="text-sm font-semibold hidden md:block">Extraer</span>
          </button>
          
          <button onClick={handleRunCode} className="flex items-center gap-2 bg-onyx-mint text-onyx-dark font-bold px-6 h-10 rounded-lg hover:shadow-[0_0_20px_rgba(167,255,235,0.3)] transition-all">
            <Play size={18} fill="currentColor" />
            <span>Ejecutar</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar de Ayuda y Apuntes (RESTAURADO) */}
        <div className="w-80 lg:w-96 bg-onyx-dark border-r border-onyx-mint/10 flex flex-col overflow-hidden">
          <div className="flex border-b border-onyx-mint/10 bg-onyx-card/30">
            <button onClick={() => setTabActiva('docs')} className={`flex-1 p-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${tabActiva === 'docs' ? 'text-onyx-mint border-b-2 border-onyx-mint' : 'text-onyx-light/40 hover:text-onyx-light/70'}`}>
              <BookOpen size={14} /> Snippets
            </button>
            <button onClick={() => setTabActiva('boveda')} className={`flex-1 p-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${tabActiva === 'boveda' ? 'text-onyx-mint border-b-2 border-onyx-mint' : 'text-onyx-light/40 hover:text-onyx-light/70'}`}>
              <FileText size={14} /> Bóveda
            </button>
            <button onClick={() => setTabActiva('guia')} className={`flex-1 p-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${tabActiva === 'guia' ? 'text-onyx-mint border-b-2 border-onyx-mint' : 'text-onyx-light/40 hover:text-onyx-light/70'}`}>
              <HelpCircle size={14} /> Atajos
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {tabActiva === 'docs' && (
              <div className="space-y-6 animate-fade-in">
                <a href={DOCS_LINKS[lenguaje]} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-onyx-mint/5 border border-onyx-mint/20 rounded-xl text-onyx-mint hover:bg-onyx-mint/10 transition-all">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase">Manual Oficial</span>
                    <span className="text-[10px] opacity-70">Documentación de {lenguaje}</span>
                  </div>
                  <ExternalLink size={16} />
                </a>

                <div>
                  <h4 className="text-onyx-mint font-bold text-sm mb-3">Snippets de Código</h4>
                  <div className="space-y-3">
                    {CHEATSHEETS[lenguaje]?.map((item) => (
                      <div key={item.id} className="bg-[#1e1e1e] border border-onyx-mint/10 rounded-lg overflow-hidden group">
                        <div className="flex justify-between items-center px-3 py-1.5 bg-[#252525] border-b border-onyx-mint/10">
                          <span className="text-[10px] font-bold text-onyx-light/50 uppercase tracking-wider">{item.titulo}</span>
                          <button 
                            onClick={() => copiarAlPortapapeles(item.id, item.codigo)}
                            className="text-onyx-light/40 hover:text-onyx-mint transition-colors p-1"
                            title="Copiar al portapapeles"
                          >
                            {copiadoId === item.id ? <Check size={14} className="text-onyx-mint" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <pre className="p-3 text-[11px] font-mono text-onyx-light/80 overflow-x-auto">
                          {item.codigo}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tabActiva === 'boveda' && (
              <div className="space-y-3 animate-fade-in">
                <h4 className="text-onyx-mint font-bold text-sm mb-2">Apuntes Personales</h4>
                <p className="text-xs text-onyx-light/50 mb-4">Haz clic en un documento para abrirlo sin salir del editor.</p>
                {misDocs.length > 0 ? (
                  misDocs.map((doc: any) => (
                    <div 
                      key={doc.id} 
                      onClick={() => setDocSeleccionado(doc)}
                      className="p-3 bg-onyx-card/50 rounded-xl border border-onyx-mint/5 hover:border-onyx-mint/30 transition-all flex items-center gap-3 cursor-pointer group"
                    >
                      <FileText size={16} className="text-onyx-light/30 group-hover:text-onyx-mint" />
                      <span className="text-xs text-onyx-light/80 truncate flex-1 group-hover:text-white transition-colors">{doc.titulo}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-onyx-light/30 italic text-center py-10">Sube apuntes en la Bóveda para verlos aquí.</p>
                )}
              </div>
            )}

            {tabActiva === 'guia' && (
              <div className="space-y-4 animate-fade-in">
                <h4 className="text-onyx-mint font-bold text-sm">Quick Reference</h4>
                <div className="grid gap-2">
                  {[
                    { key: 'Ctrl + Enter', desc: 'Ejecutar código' },
                    { key: 'Ctrl + S', desc: 'Extraer archivo' },
                    { key: 'Ctrl + Space', desc: 'Autocompletar' },
                    { key: 'Ctrl + F', desc: 'Buscar' },
                    { key: 'Ctrl + /', desc: 'Comentar' }
                  ].map((item) => (
                    <div key={item.key} className="flex justify-between items-center p-2 bg-onyx-card/50 rounded-lg border border-onyx-mint/5">
                      <span className="text-xs text-onyx-light/60">{item.desc}</span>
                      <kbd className="text-[10px] bg-onyx-dark px-1.5 py-0.5 rounded border border-onyx-mint/20 text-onyx-mint font-mono">{item.key}</kbd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Editor y Consola */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0" ref={captureRef}>
          {/* Padding estético para captura de imagen */}
          <div className={`flex-1 flex flex-col ${isCapturing ? 'p-6 bg-[#18181b]' : ''}`}>
            
            {/* Header decorativo estilo MacOS para la captura */}
            {isCapturing && (
              <div className="bg-[#2d2d2d] rounded-t-xl h-8 flex items-center px-4 gap-2 border-b border-black/20">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-[10px] text-white/30 ml-4 font-mono">main.{lenguaje} - Onyx Study</span>
              </div>
            )}

            <div className={`flex-1 ${isCapturing ? 'rounded-b-xl overflow-hidden border border-[#2d2d2d]' : ''}`}>
              <Editor
                height="100%"
                language={lenguaje === 'cpp' ? 'cpp' : lenguaje}
                theme="vs-dark"
                value={codigo}
                onChange={(val) => setCodigo(val || '')}
                onMount={handleEditorDidMount}
                options={{ minimap: { enabled: false }, fontSize: 15, fontFamily: 'Fira Code', padding: { top: 16 } }}
              />
            </div>
          </div>
          
          {/* Consola con IA Lite */}
          {!isCapturing && (
            <div className="h-48 bg-[#0d0d0d] border-t border-onyx-mint/10 flex flex-col relative">
              <div className="px-4 py-2 border-b border-onyx-mint/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold text-onyx-light/30 uppercase tracking-widest">
                  <Terminal size={14} className="text-onyx-mint" /> Console Output
                </div>
                
                {/* Botón IA Lite Aparece si hay error */}
                {errorDetectado && (
                  <button 
                    onClick={handleExplicarError}
                    disabled={isExplaining}
                    className="flex items-center gap-1.5 px-3 py-1 bg-onyx-mint/10 text-onyx-mint border border-onyx-mint/20 rounded hover:bg-onyx-mint/20 transition-all text-xs font-bold animate-fade-in"
                  >
                    <Sparkles size={12} />
                    {isExplaining ? 'Analizando...' : 'Explicar Error'}
                  </button>
                )}
              </div>
              <pre className="p-4 text-onyx-light/80 font-mono text-xs flex-1 overflow-y-auto">{consola}</pre>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DEL VISOR DE DOCUMENTOS */}
      {docSeleccionado && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="bg-onyx-dark w-full max-w-5xl h-full flex flex-col rounded-2xl border border-onyx-mint/30 overflow-hidden shadow-2xl">
            <div className="bg-onyx-card px-4 py-3 border-b border-onyx-mint/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-onyx-mint" />
                <h3 className="font-bold text-onyx-light truncate max-w-md">{docSeleccionado.titulo}</h3>
              </div>
              <button 
                onClick={() => setDocSeleccionado(null)}
                className="p-2 hover:bg-onyx-mint/10 text-onyx-light/50 hover:text-onyx-mint rounded-lg transition-colors"
                title="Cerrar visor"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-white">
              <iframe 
                src={`http://localhost:5000/${docSeleccionado.URL_archivo.replace(/\\/g, '/')}`}
                className="w-full h-full border-none"
                title="Visor PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};