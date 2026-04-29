import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export const Visor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recuperamos los datos del documento que nos pasa la vista de Bóveda
  const documento = location.state;

  if (!documento) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-onyx-light/50">No se seleccionó ningún documento.</p>
        <button onClick={() => navigate('/boveda')} className="mt-4 text-onyx-mint hover:underline">Volver a la Bóveda</button>
      </div>
    );
  }

  // Formatear la URL para que apunte a nuestro backend
  // Reemplazamos las barras invertidas de Windows por barras normales
  const fileUrl = `http://localhost:5000/${documento.url.replace(/\\/g, '/')}`;

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-fade-in -m-4 md:-m-8">
      {/* Cabecera del Visor */}
      <div className="bg-onyx-card border-b border-onyx-mint/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/boveda')}
            className="p-2 hover:bg-onyx-mint/10 rounded-lg text-onyx-light/70 hover:text-onyx-mint transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-bold text-lg truncate max-w-md">{documento.titulo}</h2>
        </div>
        <button className="flex items-center gap-2 bg-onyx-mint/10 text-onyx-mint px-4 py-2 rounded-lg hover:bg-onyx-mint/20 transition-colors">
          <Save size={18} />
          <span className="text-sm font-semibold">Guardar Notas</span>
        </button>
      </div>

      {/* Pantalla Dividida (Split-Screen) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lector PDF (Izquierda) */}
        <div className="flex-1 bg-[#2d2d2d]">
          <iframe 
            src={fileUrl} 
            className="w-full h-full border-none"
            title="Visor PDF"
          />
        </div>

        {/* Bloc de Notas (Derecha) */}
        <div className="w-80 lg:w-96 bg-onyx-dark border-l border-onyx-mint/10 p-4 flex flex-col">
          <h3 className="text-sm font-semibold text-onyx-light/50 uppercase tracking-wider mb-4">Apuntes Rápidos</h3>
          <textarea 
            className="flex-1 w-full bg-onyx-card border border-onyx-mint/5 rounded-xl p-4 text-onyx-light resize-none focus:outline-none focus:border-onyx-mint/30 transition-colors"
            placeholder="Escribe tus notas aquí mientras lees..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};