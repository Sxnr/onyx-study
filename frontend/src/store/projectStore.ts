import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PasoProyecto {
  texto: string;
  completado: boolean;
  tip?: string; // <-- AÑADIMOS EL TIP AQUÍ
}

export interface ProyectoActivo {
  id: number;
  titulo: string;
  lenguaje: string;
  pasos: PasoProyecto[];
  progreso: number;
}

interface ProjectStore {
  proyectosActivos: ProyectoActivo[];
  aceptarProyecto: (proyecto: any) => void;
  togglePaso: (proyectoId: number, pasoIndex: number) => void;
  abandonarProyecto: (proyectoId: number) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      proyectosActivos: [],

      aceptarProyecto: (proyecto) => set((state) => {
        if (state.proyectosActivos.some(p => p.id === proyecto.id)) return state;

        const nuevoProyecto: ProyectoActivo = {
          id: proyecto.id,
          titulo: proyecto.titulo,
          lenguaje: proyecto.lenguaje,
          // AHORA MAPEAMOS EL TIP TAMBIÉN
          pasos: proyecto.pasos.map((paso: any) => ({ 
            texto: paso.texto, 
            tip: paso.tip,
            completado: false 
          })),
          progreso: 0,
        };

        return { proyectosActivos: [...state.proyectosActivos, nuevoProyecto] };
      }),

      togglePaso: (proyectoId, pasoIndex) => set((state) => {
        const proyectosActualizados = state.proyectosActivos.map((proyecto) => {
          if (proyecto.id !== proyectoId) return proyecto;

          const nuevosPasos = [...proyecto.pasos];
          nuevosPasos[pasoIndex].completado = !nuevosPasos[pasoIndex].completado;

          const pasosCompletados = nuevosPasos.filter(p => p.completado).length;
          const nuevoProgreso = Math.round((pasosCompletados / nuevosPasos.length) * 100);

          return { ...proyecto, pasos: nuevosPasos, progreso: nuevoProgreso };
        });

        return { proyectosActivos: proyectosActualizados };
      }),

      abandonarProyecto: (proyectoId) => set((state) => ({
        proyectosActivos: state.proyectosActivos.filter(p => p.id !== proyectoId)
      })),
    }),
    { name: 'onyx-project-storage' }
  )
);