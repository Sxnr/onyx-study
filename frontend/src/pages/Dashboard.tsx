import { useAuthStore } from '../store/authStore';

export const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Panel de Bienvenida Dinámico */}
      <header>
        <h2 className="text-3xl font-bold">
          Hola <span className="text-onyx-mint">{user?.nombre || 'Estudiante'}</span>, tu camino hacia Java hoy
        </h2>
        <p className="text-onyx-light/50 mt-1">Comienza tu primer módulo para iniciar tu racha de estudio.</p>
      </header>
      
      {/* Grilla de Métricas Principales (Zero-State) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tarjeta de Progreso Inicializada en 0% */}
        <div className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/10 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-onyx-mint text-xs uppercase tracking-widest font-bold">Progreso General</h3>
            <span className="text-onyx-mint text-xs font-bold">0%</span>
          </div>
          <p className="text-4xl font-bold mb-4">Nivel {user?.nivel || 1}</p>
          <div className="w-full bg-onyx-dark h-2 rounded-full overflow-hidden">
            <div 
              className="bg-onyx-mint h-full rounded-full transition-all duration-1000" 
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>

        {/* Tarjeta de Desafíos Inicializada en 0 */}
        <div className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/10 shadow-lg">
          <h3 className="text-onyx-mint text-xs uppercase tracking-widest font-bold mb-4">Desafíos de Código</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold">0</p>
            <p className="text-onyx-light/50 text-sm">/ 25 completados</p>
          </div>
        </div>

        {/* Tarjeta de XP Inicializada en 0 */}
        <div className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/10 shadow-lg">
          <h3 className="text-onyx-mint text-xs uppercase tracking-widest font-bold mb-4">Experiencia Acumulada</h3>
          <p className="text-4xl font-bold">0 <span className="text-lg font-medium text-onyx-light/50">XP</span></p>
        </div>
      </div>

      {/* Módulo de Onboarding / Primera Lección */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-onyx-light/90">Tu primer paso</h3>
        <div className="bg-onyx-card border border-onyx-mint/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-onyx-dark rounded-lg flex items-center justify-center text-onyx-mint font-bold border border-onyx-mint/20">
              JAVA
            </div>
            <div>
              <p className="font-medium">Sintaxis Básica y Variables</p>
              <p className="text-sm text-onyx-light/50">Lección 1 • Introducción</p>
            </div>
          </div>
          <div className="text-onyx-mint opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </div>
        </div>
      </section>
    </div>
  );
};