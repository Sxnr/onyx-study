import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Plus, Search, Trash2, X, UploadCloud } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const Boveda = () => {
  const [documentos, setDocumentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [titulo, setTitulo] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  const token = useAuthStore((state) => state.token);

  const fetchDocs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/documentos/mis-documentos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocumentos(res.data);
    } catch (err) {
      console.error("Error cargando la bóveda", err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [token]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('titulo', titulo || archivo.name);
    formData.append('esPublico', 'false');

    try {
      await axios.post('http://localhost:5000/api/documentos/upload', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setIsModalOpen(false);
      setArchivo(null);
      setTitulo('');
      fetchDocs(); // Recargar la lista después de subir
    } catch (err) {
      console.error("Error al subir archivo", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6 relative">
      {/* Cabecera */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Mi Bóveda</h2>
          <p className="text-onyx-light/50">Tus apuntes y recursos personales.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-onyx-mint text-onyx-dark font-bold px-4 py-2 rounded-xl hover:bg-white transition-all"
        >
          <Plus size={20} />
          <span>Subir Archivo</span>
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-onyx-light/30" size={18} />
        <input 
          type="text" 
          placeholder="Buscar en mis documentos..." 
          className="w-full bg-onyx-card border border-onyx-mint/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-onyx-mint/50 transition-colors"
        />
      </div>

      {/* Grilla de Documentos */}
      {documentos.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-onyx-mint/10 rounded-3xl">
          <FileText size={48} className="text-onyx-light/20 mb-2" />
          <p className="text-onyx-light/40 italic">La bóveda está vacía. Comienza subiendo un documento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentos.map((doc: any) => (
            <div 
              key={doc.id} 
              onClick={() => navigate('/visor', { state: { titulo: doc.titulo, url: doc.URL_archivo } })}
              className="bg-onyx-card p-4 rounded-2xl border border-onyx-mint/5 hover:border-onyx-mint/30 transition-all group cursor-pointer flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-onyx-mint/10 rounded-lg flex items-center justify-center text-onyx-mint mb-3">
                  <FileText size={20} />
                </div>
                {/* Botón Eliminar con stopPropagation */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se abra el visor al hacer clic aquí
                    console.log("Eliminar doc", doc.id);
                  }}
                  className="text-onyx-light/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h4 className="font-medium text-onyx-light truncate" title={doc.titulo}>
                {doc.titulo}
              </h4>
              <p className="text-xs text-onyx-light/40 mt-1">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Subida */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-onyx-card p-6 rounded-2xl border border-onyx-mint/20 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Subir a la Bóveda</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-onyx-light/50 hover:text-onyx-light">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-onyx-mint/20 rounded-xl p-8 text-center hover:bg-onyx-mint/5 transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <UploadCloud size={40} className="text-onyx-mint/50 mx-auto mb-2" />
                <p className="text-sm font-medium text-onyx-light">
                  {archivo ? archivo.name : "Haz clic o arrastra tu archivo aquí"}
                </p>
              </div>

              <div>
                <label className="block text-sm text-onyx-light/70 mb-1">Título (Opcional)</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: Apuntes de Arquitectura de Sistemas"
                  className="w-full bg-onyx-dark border border-onyx-mint/20 rounded-lg p-3 text-onyx-light focus:outline-none focus:border-onyx-mint transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!archivo || isUploading}
                className="w-full bg-onyx-mint text-onyx-dark font-bold py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isUploading ? 'Subiendo...' : 'Guardar Archivo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};