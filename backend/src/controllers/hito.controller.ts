import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const obtenerHitos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const hitos = await prisma.hito.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });
    res.json(hitos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener hitos' });
  }
};

export const crearHito = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ramo, tipo, fecha, urgente } = req.body;
    const userId = (req as any).user.userId;

    const nuevoHito = await prisma.hito.create({
      data: { ramo, tipo, fecha, urgente, userId }
    });
    res.status(201).json(nuevoHito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear hito' });
  }
};

export const eliminarHito = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    await prisma.hito.delete({ where: { id } });
    res.json({ mensaje: 'Hito eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar hito' });
  }
};