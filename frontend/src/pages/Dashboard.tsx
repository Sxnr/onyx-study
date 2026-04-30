import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Code2, FileText, Calendar, ChevronRight, Play, Plus, Trash2, X, Trophy, Target, Zap } from 'lucide-react';

export const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const [hitos, setHitos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nuevoHito, setNuevoHito] = useState({ ramo: '', tipo: '', fecha: '', urgente: false });
  const [showExpModal, setShowExpModal] = useState(false);

  // NUEVO: Estado para almacenar las estadísticas reales calculadas desde la BD
  const [stats, setStats] = useState({
    expTotal: 0,
    nivel: 1,
    completados: 0,
    totalRetos: 0
  });

  const fetchData = async () => {
    try {
      // 1. Cargar Hitos (Calendario)
      const resHitos = await axios.get('http://localhost:5000/api/hitos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHitos(resHitos.data);

      // 2. Cargar Desafíos para calcular Progreso Real
      const resDesafios = await axios.get('http://localhost:5000/api/desafios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const desafios = resDesafios.data;
      const retosCompletados = desafios.filter((reto: any) => reto.completado);
      
      // Sumamos la XP de todos los retos completados
      const expAcumulada = retosCompletados.reduce((sum: number, reto: any) => sum + reto.xp, 0);
      
      // Calculamos el nivel (cada 1000 XP es un nivel nuevo)
      const nivelCalculado = Math.floor(expAcumulada / 1000) + 1;

      setStats({
        expTotal: expAcumulada,
        nivel: nivelCalculado,
        completados: retosCompletados.length,
        totalRetos: desafios.length
      });

    } catch (err) {
      console.error("Error al cargar datos del dashboard", err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // Lógica de Hitos
  const handleCreateHito = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/hitos', nuevoHito, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNuevoHito({ ramo: '', tipo: '', fecha: '', urgente: false });
      setShowForm(false);
      fetchData(); // Recargar todo
    } catch (err) {
      console.error("Error al crear hito", err);
    }
  };

  const deleteHito = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/hitos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error("Error al eliminar", err);
    }
  };

  // Cálculos para las barras de progreso
  const xpParaSiguienteNivel = 1000;
  const xpNivelActual = stats.expTotal % xpParaSiguienteNivel;
  const porcentajeProgreso = Math.floor((xpNivelActual / xpParaSiguienteNivel) * 100);

  return (
    <div className="animate-fade-in space-y-8 pb-8 relative">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">
            Bienvenido de vuelta, <span className="text-onyx-mint">{user?.nombre || 'Estudiante'}</span>
          </h2>
          <p className="text-onyx-light/50 mt-1">Aquí está el resumen de tu progreso y tus tareas pendientes.</p>
        </div>
      </header>
      
      {/* Grilla de Métricas Principales (AHORA CON DATOS REALES) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta de Nivel */}
        <div 
          onClick={() => setShowExpModal(true)}
          className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/10 shadow-lg relative overflow-hidden group cursor-pointer hover:border-onyx-mint/30 transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-onyx-mint/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-onyx-mint/10"></div>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h3 className="text-onyx-mint text-xs uppercase tracking-widest font-bold">Progreso General</h3>
            <span className="text-onyx-mint text-xs font-bold">{porcentajeProgreso}%</span>
          </div>
          <p className="text-4xl font-bold mb-4 relative z-10">Nivel {stats.nivel}</p>
          <div className="w-full bg-onyx-dark h-2 rounded-full overflow-hidden relative z-10">
            <div 
              className="bg-onyx-mint h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${porcentajeProgreso}%` }}
            ></div>
          </div>
        </div>

        {/* Tarjeta de Desafíos */}
        <div 
          onClick={() => navigate('/retos')}
          className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/10 shadow-lg cursor-pointer hover:border-onyx-mint/30 transition-all group"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-onyx-mint text-xs uppercase tracking-widest font-bold">Desafíos de Código</h3>
            <ChevronRight size={16} className="text-onyx-light/30 group-hover:text-onyx-mint transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold">{stats.completados}</p>
            <p className="text-onyx-light/50 text-sm">/ {stats.totalRetos || 360} completados</p>
          </div>
        </div>

        {/* Tarjeta de XP */}
        <div 
          onClick={() => setShowExpModal(true)}
          className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/10 shadow-lg cursor-pointer hover:border-onyx-mint/30 transition-all group"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-onyx-mint text-xs uppercase tracking-widest font-bold">Experiencia</h3>
            <ChevronRight size={16} className="text-onyx-light/30 group-hover:text-onyx-mint transition-colors" />
          </div>
          <p className="text-4xl font-bold">{stats.expTotal} <span className="text-lg font-medium text-onyx-light/50">XP</span></p>
          <p className="text-xs text-onyx-light/40 mt-2 font-mono">Faltan {xpParaSiguienteNivel - xpNivelActual} XP para Nivel {stats.nivel + 1}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        {/* Accesos Rápidos */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-onyx-light/90">Herramientas Principales</h3>
          <div className="space-y-4">
            <div 
              onClick={() => navigate('/sandbox')}
              className="bg-onyx-card border border-onyx-mint/10 p-5 rounded-xl flex items-center justify-between hover:bg-onyx-mint/5 hover:border-onyx-mint/30 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-onyx-dark rounded-lg flex items-center justify-center text-onyx-mint border border-onyx-mint/20 group-hover:scale-105 transition-transform">
                  <Code2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">IDE & Sandbox</p>
                  <p className="text-sm text-onyx-light/50">Escribe, compila y prueba código en tiempo real.</p>
                </div>
              </div>
              <div className="bg-onyx-mint text-onyx-dark p-2 rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <Play size={16} fill="currentColor" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/boveda')}
              className="bg-onyx-card border border-onyx-mint/10 p-5 rounded-xl flex items-center justify-between hover:bg-onyx-mint/5 hover:border-onyx-mint/30 transition-all cursor-pointer group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-onyx-dark rounded-lg flex items-center justify-center text-onyx-mint border border-onyx-mint/20 group-hover:scale-105 transition-transform">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Mi Bóveda</p>
                  <p className="text-sm text-onyx-light/50">Revisa tus apuntes y documentos recientes.</p>
                </div>
              </div>
              <ChevronRight className="text-onyx-mint opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </div>
        </section>

        {/* Widget de Calendario Real */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-onyx-light/90">Próximos Hitos</h3>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1 text-xs font-bold text-onyx-mint hover:bg-onyx-mint/10 p-1 rounded transition-all"
            >
              {showForm ? <X size={14} /> : <Plus size={14} />}
              {showForm ? 'Cancelar' : 'Añadir Hito'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleCreateHito} className="bg-onyx-card border border-onyx-mint/20 rounded-xl p-4 mb-4 space-y-3 animate-fade-in">
              <input 
                type="text" placeholder="Nombre del ramo (ej: Cálculo)" required
                className="w-full bg-onyx-dark border border-onyx-mint/10 rounded-lg p-2 text-sm text-onyx-light outline-none focus:border-onyx-mint/50 transition-colors"
                onChange={(e) => setNuevoHito({...nuevoHito, ramo: e.target.value})}
              />
              <div className="flex gap-2">
                <input 
                  type="text" placeholder="Tipo (ej: Certamen 1)" required
                  className="flex-1 bg-onyx-dark border border-onyx-mint/10 rounded-lg p-2 text-sm text-onyx-light outline-none focus:border-onyx-mint/50 transition-colors"
                  onChange={(e) => setNuevoHito({...nuevoHito, tipo: e.target.value})}
                />
                <input 
                  type="date" required
                  className="flex-1 bg-onyx-dark border border-onyx-mint/10 rounded-lg p-2 text-sm text-onyx-light outline-none focus:border-onyx-mint/50 transition-colors [color-scheme:dark]"
                  onChange={(e) => setNuevoHito({...nuevoHito, fecha: e.target.value})}
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-onyx-light/60 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="accent-onyx-mint"
                  onChange={(e) => setNuevoHito({...nuevoHito, urgente: e.target.checked})}
                />
                ¿Es urgente?
              </label>
              <button type="submit" className="w-full bg-onyx-mint text-onyx-dark font-bold py-2 rounded-lg text-sm hover:shadow-[0_0_15px_rgba(167,255,235,0.2)] transition-all">Guardar Hito</button>
            </form>
          )}
          
          <div className="bg-onyx-card border border-onyx-mint/10 rounded-xl overflow-hidden shadow-lg min-h-[100px]">
            {hitos.length === 0 ? (
              <div className="p-10 text-center">
                <Calendar size={32} className="mx-auto text-onyx-light/10 mb-2" />
                <p className="text-sm text-onyx-light/30 italic">No tienes eventos programados.</p>
              </div>
            ) : (
              hitos.map((hito: any) => (
                <div key={hito.id} className="p-4 flex items-start gap-4 border-b border-onyx-mint/5 group">
                  <div className={`mt-1 p-2 rounded-lg ${hito.urgente ? 'bg-red-500/10 text-red-400' : 'bg-onyx-mint/10 text-onyx-mint'}`}>
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-onyx-light">{hito.ramo}</p>
                        {hito.urgente && <span className="text-[9px] uppercase tracking-wider bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">Pronto</span>}
                      </div>
                      <button 
                        onClick={() => deleteHito(hito.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-onyx-light/20 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-onyx-light/70 mt-0.5">{hito.tipo}</p>
                    <p className="text-xs text-onyx-light/40 mt-1 font-mono">{hito.fecha}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* MODAL DE EXPLICACIÓN DE PROGRESO */}
      {showExpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-onyx-card w-full max-w-lg rounded-2xl border border-onyx-mint/30 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-onyx-mint/10 flex justify-between items-center bg-onyx-dark">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="text-onyx-mint" /> ¿Cómo funciona tu Progreso?
              </h3>
              <button onClick={() => setShowExpModal(false)} className="text-onyx-light/50 hover:text-onyx-mint transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-onyx-mint/10 flex items-center justify-center shrink-0">
                  <Target size={20} className="text-onyx-mint" />
                </div>
                <div>
                  <h4 className="font-bold text-onyx-light">Desafíos de Código</h4>
                  <p className="text-sm text-onyx-light/60 mt-1">
                    Tu principal forma de avanzar. Dirígete a la sección de <span className="text-onyx-mint font-semibold">Retos</span> en el panel lateral. Lee el problema, escribe tu solución en el IDE y pásalo por nuestros casos de prueba.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-onyx-mint/10 flex items-center justify-center shrink-0">
                  <Zap size={20} className="text-onyx-mint" />
                </div>
                <div>
                  <h4 className="font-bold text-onyx-light">Puntos de Experiencia (XP)</h4>
                  <p className="text-sm text-onyx-light/60 mt-1">
                    Completar un desafío te otorga XP basado en su dificultad. Tu barra de progreso se llena conforme acumulas experiencia.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-onyx-mint/10 flex items-center justify-center shrink-0 flex-col">
                  <span className="text-onyx-mint font-bold text-sm">LVL</span>
                </div>
                <div>
                  <h4 className="font-bold text-onyx-light">Subida de Nivel</h4>
                  <p className="text-sm text-onyx-light/60 mt-1">
                    Cada <strong>1,000 XP</strong> subes de Nivel. Mantén tu racha viva y demuestra tu dominio completando toda la currícula.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowExpModal(false);
                  navigate('/retos');
                }}
                className="w-full mt-4 bg-onyx-mint text-onyx-dark font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(167,255,235,0.3)] transition-all flex justify-center items-center gap-2"
              >
                Comenzar un Desafío <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};