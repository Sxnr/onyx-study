import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trophy, Terminal, Zap, ChevronRight, CheckCircle2, Lock, Search, Code2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Retos = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  
  const [desafios, setDesafios] = useState<any[]>([]);
  const [filtro, setFiltro] = useState('Todos');
  const [filtroLenguaje, setFiltroLenguaje] = useState('Todos'); // NUEVO ESTADO PARA LENGUAJE
  const [busqueda, setBusqueda] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/desafios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDesafios(res.data);
      } catch (error) {
        console.error("Error al cargar desafíos", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) fetchDesafios();
  }, [token]);

  // ACTUALIZADA LA LÓGICA DE FILTRADO
  const retosFiltrados = desafios.filter((reto) => {
    const coincideFiltro = filtro === 'Todos' || reto.nivel_dificultad === filtro;
    const coincideLenguaje = filtroLenguaje === 'Todos' || reto.lenguaje === filtroLenguaje;
    const coincideBusqueda = reto.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideLenguaje && coincideBusqueda;
  });

  return (
    <div className="animate-fade-in space-y-8 pb-8">
      {/* Cabecera Mejorada */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-onyx-mint/10 pb-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="text-onyx-mint" size={32} />
            Desafíos de Código
          </h2>
          <p className="text-onyx-light/50 mt-2 max-w-2xl">
            Pon a prueba tu lógica. Resuelve problemas en el Sandbox, pasa los casos de prueba y acumula XP para subir de nivel.
          </p>
        </div>

        {/* Buscador Integrado */}
        <div className="w-full md:w-72 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-onyx-mint/30 group-focus-within:text-onyx-mint transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Buscar desafío..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-onyx-card border border-onyx-mint/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-onyx-mint/40 transition-all text-sm text-onyx-light placeholder:text-onyx-light/20 shadow-inner"
          />
        </div>
      </header>

      {/* NUEVO: Menú de Filtros (Lenguaje y Dificultad) */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Dropdown de Lenguajes */}
        <select 
          value={filtroLenguaje} 
          onChange={(e) => setFiltroLenguaje(e.target.value)}
          className="bg-onyx-dark border border-onyx-mint/20 rounded-xl px-4 py-2 text-sm font-bold text-onyx-light focus:outline-none focus:border-onyx-mint/50 transition-all cursor-pointer"
        >
          <option value="Todos">Todos los lenguajes</option>
          <option value="java">Java 17</option>
          <option value="python">Python 3</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++ 20</option>
          <option value="dart">Dart</option>
          <option value="universal">Lógica Universal</option>
        </select>

        {/* Filtros de Dificultad */}
        <div className="flex flex-wrap gap-3">
          {['Todos', 'Principiante', 'Intermedio', 'Avanzado'].map((nivel) => (
            <button
              key={nivel}
              onClick={() => setFiltro(nivel)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${
                filtro === nivel 
                ? 'bg-onyx-mint text-onyx-dark border-onyx-mint shadow-[0_0_15px_rgba(167,255,235,0.2)]' 
                : 'bg-onyx-card border-onyx-mint/10 text-onyx-light/50 hover:border-onyx-mint/30'
              }`}
            >
              {nivel}
            </button>
          ))}
        </div>
      </div>

      {/* Manejo de Estados: Cargando, Vacío o Lista */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-onyx-mint/20 border-t-onyx-mint rounded-full animate-spin"></div>
          <p className="text-onyx-light/50 mt-4 text-sm font-bold animate-pulse">Cargando base de datos...</p>
        </div>
      ) : desafios.length === 0 ? (
        // ZERO-STATE: Cuando la base de datos está vacía
        <div className="bg-onyx-card border-2 border-dashed border-onyx-mint/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
          <div className="bg-onyx-mint/10 p-4 rounded-full mb-4 text-onyx-mint">
            <Code2 size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">Aún no hay desafíos disponibles</h3>
          <p className="text-onyx-light/50 max-w-md mx-auto">
            El sistema está esperando que se inyecten los problemas de programación. 
            Próximamente podrás empezar a ganar XP.
          </p>
        </div>
      ) : retosFiltrados.length === 0 ? (
        // Estado vacío de búsqueda
        <div className="text-center py-12">
          <p className="text-onyx-light/40 italic">No se encontraron desafíos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        // Grilla de Retos Dinámica
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {retosFiltrados.map((reto) => (
            <div 
              key={reto.id} 
              className={`relative bg-onyx-card p-6 rounded-2xl border transition-all flex flex-col h-full ${
                reto.completado 
                  ? 'border-onyx-mint/50 shadow-[0_0_20px_rgba(167,255,235,0.05)]' 
                  : reto.bloqueado 
                    ? 'border-onyx-light/5 opacity-60 grayscale' 
                    : 'border-onyx-mint/10 hover:border-onyx-mint/30 hover:shadow-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${reto.completado ? 'bg-onyx-mint/20 text-onyx-mint' : 'bg-onyx-dark border border-onyx-mint/10 text-onyx-light/70'}`}>
                  {reto.completado ? <CheckCircle2 size={20} /> : reto.bloqueado ? <Lock size={20} /> : <Terminal size={20} />}
                </div>
                <div className="flex items-center gap-1.5 bg-onyx-dark px-3 py-1 rounded-full border border-onyx-mint/10">
                  <Zap size={14} className={reto.completado ? 'text-onyx-light/40' : 'text-yellow-400'} />
                  <span className={`text-xs font-bold ${reto.completado ? 'text-onyx-light/40 line-through' : 'text-onyx-light'}`}>
                    {reto.xp || 100} XP
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-onyx-light">{reto.titulo}</h3>
                </div>
                {/* CORRECCIÓN: reto.descripcion sin tilde para que lea correctamente la BD */}
                <p className="text-sm text-onyx-light/60 mb-6">{reto.descripcion}</p>
              </div>

              <button 
                disabled={reto.bloqueado}
                onClick={() => navigate(`/workspace/${reto.id}`)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  reto.completado 
                    ? 'bg-onyx-dark text-onyx-mint border border-onyx-mint/20 hover:bg-onyx-mint/10' 
                    : reto.bloqueado
                      ? 'bg-onyx-dark text-onyx-light/20 cursor-not-allowed'
                      : 'bg-onyx-mint text-onyx-dark hover:bg-white hover:shadow-[0_0_15px_rgba(167,255,235,0.3)]'
                }`}
              >
                {reto.completado ? 'Volver a resolver' : reto.bloqueado ? 'Nivel insuficiente' : 'Resolver ahora'}
                {!reto.bloqueado && <ChevronRight size={18} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};