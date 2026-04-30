import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const obtenerDesafios = async (req: Request, res: Response): Promise<void> => {
  try {
    // CORRECCIÓN: Cambiado de user.id a user.userId
    const userId = (req as any).user.userId; 

    const desafios = await prisma.desafio.findMany();

    desafios.sort((a, b) => {
      if (a.xp !== b.xp) return a.xp - b.xp;
      return a.titulo.localeCompare(b.titulo, undefined, { numeric: true, sensitivity: 'base' });
    });

    const progresoUsuario = await prisma.progreso.findMany({
      where: { usuario_id: userId } // Usando userId
    });

    const desafiosConEstado = desafios.map(desafio => {
      const completado = progresoUsuario.some(
        (p) => p.desafio_id === desafio.id && p.estado === 'Completado'
      );

      return {
        ...desafio,
        completado: completado,
        bloqueado: false 
      };
    });
    
    res.json(desafiosConEstado);
  } catch (error) {
    console.error('Error al obtener desafíos:', error);
    res.status(500).json({ error: 'Error al cargar los desafíos' });
  }
};

export const obtenerDesafioPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    const desafio = await prisma.desafio.findUnique({
      where: { id }
    });

    if (!desafio) {
      res.status(404).json({ error: 'Desafío no encontrado' });
      return;
    }

    res.json(desafio);
  } catch (error) {
    console.error('Error al obtener el desafío:', error);
    res.status(500).json({ error: 'Error al cargar el desafío' });
  }
};

export const completarDesafio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { desafioId, xp } = req.body;
    // CORRECCIÓN: Cambiado de user.id a user.userId
    const usuarioId = (req as any).user.userId;

    const yaCompletado = await prisma.progreso.findFirst({
      where: { 
        usuario_id: usuarioId, 
        desafio_id: desafioId 
      }
    });

    if (yaCompletado) {
      res.status(400).json({ error: 'Este desafío ya ha sido completado anteriormente.' });
      return;
    }

    await prisma.$transaction([
      prisma.progreso.create({
        data: {
          usuario_id: usuarioId,
          desafio_id: desafioId,
          estado: 'Completado',
          fecha_completado: new Date()
        }
      }),
      prisma.usuario.update({
        where: { id: usuarioId },
        data: { exp: { increment: xp } }
      })
    ]);

    res.json({ message: '¡Felicidades! XP sumada y desafío registrado.' });
  } catch (error) {
    console.error('Error al registrar progreso:', error);
    res.status(500).json({ error: 'No se pudo guardar tu progreso.' });
  }
};