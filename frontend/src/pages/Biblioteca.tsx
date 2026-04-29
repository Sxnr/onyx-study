import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Star, Book, Library, GraduationCap, ExternalLink, Filter } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Biblioteca = () => {
  const [recursos, setRecursos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCat, setFiltroCat] = useState('');
  const token = useAuthStore(state => state.token);

  const fetchRecursos = async () => {
    const res = await axios.get(`http://localhost:5000/api/biblioteca?busqueda=${busqueda}&categoria=${filtroCat}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRecursos(res.data);
  };

  useEffect(() => { fetchRecursos(); }, [busqueda, filtroCat]);

  const handleToggleFav = async (id: string) => {
    await axios.post('http://localhost:5000/api/biblioteca/favorito', { recursoId: id }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchRecursos();
  };

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h2 className="text-3xl font-bold">Biblioteca Global</h2>
        <p className="text-onyx-light/50 font-medium">Documentación oficial, librerías y material de estudio seleccionado.</p>
      </header>

      {/* Buscador y Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-onyx-light/30" size={18} />
          <input 
            type="text" 
            placeholder="Buscar librerías, APIs, lenguajes..." 
            className="w-full bg-onyx-card border border-onyx-mint/10 rounded-2xl py-4 pl-12 pr-4 focus:border-onyx-mint/50 outline-none transition-all"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['Documentación', 'Librería', 'Curso'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFiltroCat(filtroCat === cat ? '' : cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${filtroCat === cat ? 'bg-onyx-mint text-onyx-dark border-onyx-mint' : 'border-onyx-mint/20 text-onyx-light/60 hover:border-onyx-mint/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla de Recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursos.map((rec: any) => (
          <div key={rec.id} className="bg-onyx-card border border-onyx-mint/5 rounded-2xl p-6 hover:border-onyx-mint/30 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-onyx-mint/10 rounded-xl text-onyx-mint">
                {rec.categoria === 'Documentación' ? <Book size={24} /> : rec.categoria === 'Librería' ? <Library size={24} /> : <GraduationCap size={24} />}
              </div>
              <button 
                onClick={() => handleToggleFav(rec.id)}
                className={`transition-colors ${rec.esFavorito ? 'text-onyx-mint' : 'text-onyx-light/20 hover:text-onyx-mint/50'}`}
              >
                <Star size={24} fill={rec.esFavorito ? "currentColor" : "none"} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-onyx-mint transition-colors">{rec.titulo}</h3>
            <p className="text-sm text-onyx-light/60 mb-6 line-clamp-2">{rec.descripcion}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-onyx-mint/50 bg-onyx-mint/5 px-2 py-1 rounded">
                {rec.lenguaje}
              </span>
              <a 
                href={rec.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-onyx-mint hover:underline"
              >
                Abrir <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};