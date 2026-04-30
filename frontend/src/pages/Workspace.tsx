import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import {
  Play,
  CheckCircle2,
  ChevronLeft,
  Lightbulb,
  Terminal,
  AlertCircle,
  Zap,
  Trophy, // AÑADIDO EL TROFEO PARA LA VICTORIA
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

export const Workspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const sumarExp = useAuthStore((state) => state.sumarExp); // TRAEMOS LA NUEVA FUNCIÓN

  const [reto, setReto] = useState<any>(null);
  const [codigo, setCodigo] = useState("");
  const [consola, setConsola] = useState("Esperando ejecución...");
  const [evaluando, setEvaluando] = useState(false);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [resultadoTest, setResultadoTest] = useState<
    "idle" | "success" | "fail"
  >("idle");

  const editorRef = useRef<any>(null);

  useEffect(() => {
    const fetchReto = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/desafios/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setReto(res.data);
        setCodigo(res.data.codigo_inicial || "// Escribe tu solución aquí\n");
      } catch (error) {
        console.error("Error al cargar el reto", error);
        navigate("/retos");
      }
    };
    if (token && id) fetchReto();
  }, [id, token, navigate]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
      evaluarCodigo(),
    );
  };

  const evaluarCodigo = async () => {
    if (!reto) return;
    setEvaluando(true);
    setConsola(
      `[${new Date().toLocaleTimeString()}] Ejecutando tu solución...`,
    );
    setResultadoTest("idle");

    try {
      const res = await axios.post("http://localhost:5000/api/ejecucion/run", {
        codigo,
        lenguaje: reto.lenguaje,
      });

      const output = res.data.output.trim();
      const expected = reto.casos_prueba?.expected?.toString().trim();

      // Validación
      if (expected && output.includes(expected)) {
        setResultadoTest("success");
        setConsola(`[SISTEMA]: ¡Prueba superada con éxito!\n${output}`);

        try {
          await axios.post(
            "http://localhost:5000/api/desafios/completar",
            {
              desafioId: reto.id,
              xp: reto.xp,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          // ACTUALIZACIÓN EN TIEMPO REAL AL DASHBOARD
          sumarExp(reto.xp);
          console.log("¡XP guardada y estado actualizado!");
          
          // Redirección con más tiempo para ver el cartel
          setTimeout(() => {
            navigate("/retos");
          }, 3500);

        } catch (err: any) {
          console.error("Error al guardar progreso en el servidor", err);
          if (err.response?.status === 400) {
            setTimeout(() => navigate("/retos"), 2500);
          }
        }
      } else {
        setResultadoTest("fail");
        setConsola(`[SISTEMA]: La salida no coincide con lo esperado.\nEsperado: ${expected}\nObtenido: ${output}`);
      }
    } catch (err: any) {
      setConsola(
        `[ERROR]:\n${err.response?.data?.error || "Fallo de compilación"}`,
      );
      setResultadoTest("fail");
    } finally {
      setEvaluando(false);
    }
  };

  if (!reto)
    return (
      <div className="p-10 text-onyx-mint animate-pulse">
        Cargando entorno de trabajo...
      </div>
    );

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-fade-in -m-4 md:-m-8 relative">
      
      {/* POPUP DE VICTORIA GIGANTE (OVERLAY QUE CUBRE TODO) */}
      {resultadoTest === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-onyx-card border border-onyx-mint/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(167,255,235,0.2)] flex flex-col items-center text-center transform scale-110 transition-all">
            <div className="w-24 h-24 bg-onyx-mint/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <Trophy size={48} className="text-onyx-mint" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-3">¡Desafío Superado!</h2>
            <p className="text-onyx-light/70 mb-8 text-lg">Tu código pasó todas las pruebas con éxito.</p>
            <div className="bg-onyx-dark px-8 py-4 rounded-full border border-onyx-mint/20 flex items-center gap-3">
              <Zap className="text-yellow-400" size={28} />
              <span className="text-3xl font-bold text-yellow-400">+{reto.xp} XP</span>
            </div>
            <p className="text-onyx-light/30 text-sm mt-8 animate-pulse">Redirigiendo al menú de retos...</p>
          </div>
        </div>
      )}

      {/* Header del Workspace */}
      <div className="bg-onyx-card border-b border-onyx-mint/10 p-4 flex items-center justify-between shadow-lg z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/retos")}
            className="flex items-center gap-1 text-onyx-light/50 hover:text-onyx-mint transition-colors text-sm font-bold"
          >
            <ChevronLeft size={18} /> Volver
          </button>
          <div className="h-6 w-px bg-onyx-mint/20"></div>
          <span className="text-xs font-bold text-onyx-mint uppercase tracking-widest bg-onyx-mint/10 px-3 py-1 rounded-full">
            {reto.lenguaje}
          </span>
          <h2 className="font-bold text-onyx-light truncate max-w-[200px] md:max-w-md">
            {reto.titulo}
          </h2>
        </div>

        <button
          onClick={evaluarCodigo}
          disabled={evaluando || resultadoTest === "success"}
          className="flex items-center gap-2 bg-onyx-mint text-onyx-dark font-bold px-6 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(167,255,235,0.3)] transition-all disabled:opacity-50"
        >
          {evaluando ? (
            <div className="w-4 h-4 border-2 border-onyx-dark border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Play size={18} fill="currentColor" />
          )}
          <span>Evaluar Solución</span>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Panel Izquierdo: Instrucciones y Ayuda */}
        <div className="w-80 lg:w-[400px] bg-onyx-dark border-r border-onyx-mint/10 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-onyx-light/40 uppercase">
                  Instrucciones
                </span>
                <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                  <Zap size={14} /> {reto.xp} XP
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {reto.titulo}
              </h3>
              <p className="text-onyx-light/80 text-sm leading-relaxed">
                {reto.descripcion}
              </p>
            </div>

            <div className="bg-onyx-card/50 border border-onyx-mint/10 rounded-xl p-4">
              <span className="text-xs font-bold text-onyx-light/40 uppercase block mb-2">
                Salida Esperada
              </span>
              <code className="text-onyx-mint font-mono text-sm">
                {reto.casos_prueba?.expected || "N/A"}
              </code>
            </div>

            {/* Sistema de Pistas */}
            <div className="border-t border-onyx-mint/10 pt-6">
              <button
                onClick={() => setMostrarPista(!mostrarPista)}
                className="flex items-center gap-2 text-sm font-bold text-onyx-mint/70 hover:text-onyx-mint transition-colors"
              >
                <Lightbulb size={16} />{" "}
                {mostrarPista ? "Ocultar Pista" : "Necesito una pista"}
              </button>

              {mostrarPista && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-sm text-yellow-200/80 animate-fade-in">
                  <strong>💡 Consejo:</strong> Recuerda verificar bien la
                  sintaxis de <code>{reto.lenguaje}</code>. No te preocupes por
                  librerías externas, todo se resuelve usando las herramientas
                  nativas del lenguaje.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel Derecho: Editor y Consola */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0">
          <div className="flex-1 relative">
            {/* Feedback Visual Overlay de Error */}
            {resultadoTest === "fail" && (
              <div className="absolute top-4 right-4 z-10 bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg flex items-center gap-2 font-bold animate-fade-in backdrop-blur-md">
                <AlertCircle size={18} /> La salida no coincide
              </div>
            )}

            <Editor
              height="100%"
              language={
                reto.lenguaje === "nodejs" ? "javascript" : reto.lenguaje
              }
              theme="vs-dark"
              value={codigo}
              onChange={(val) => setCodigo(val || "")}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: "Fira Code",
                padding: { top: 16 },
              }}
            />
          </div>

          <div className="h-56 bg-[#0d0d0d] border-t border-onyx-mint/10 flex flex-col">
            <div className="px-4 py-2 border-b border-onyx-mint/5 flex items-center gap-2 text-[10px] font-bold text-onyx-light/30 uppercase tracking-widest">
              <Terminal size={14} className="text-onyx-mint" /> Resultados de
              Evaluación
            </div>
            <pre
              className={`p-4 font-mono text-xs flex-1 overflow-y-auto ${resultadoTest === "fail" ? "text-red-400/80" : resultadoTest === "success" ? "text-green-400/80" : "text-onyx-light/80"}`}
            >
              {consola}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};