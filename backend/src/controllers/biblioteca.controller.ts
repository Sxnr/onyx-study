import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const obtenerRecursos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { busqueda, categoria, lenguaje, asignatura } = req.query; // <--- Agregar asignatura
    const userId = (req as any).user.id;

    const recursos = await prisma.recursoPublico.findMany({
      where: {
        AND: [
          busqueda ? { titulo: { contains: busqueda as string, mode: 'insensitive' } } : {},
          categoria ? { categoria: categoria as string } : {},
          lenguaje ? { lenguaje: lenguaje as string } : {},
          asignatura ? { asignatura: asignatura as string } : {}, // <--- Nuevo filtro
        ]
      },
      include: { favoritoDe: { where: { usuario_id: userId } } }
    });

    const mapeados = recursos.map((r: any) => ({
      ...r,
      esFavorito: r.favoritoDe.length > 0
    }));

    res.json(mapeados);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar la biblioteca' });
  }
};

export const toggleFavorito = async (req: Request, res: Response): Promise<void> => {
  const { recursoId } = req.body;
  const userId = (req as any).user.userId;

  try {
    const existe = await prisma.favorito.findUnique({
      where: { usuario_id_recurso_id: { usuario_id: userId, recurso_id: recursoId } }
    });

    if (existe) {
      await prisma.favorito.delete({ where: { id: existe.id } });
      res.json({ mensaje: 'Eliminado de favoritos', estado: false });
    } else {
      await prisma.favorito.create({ data: { usuario_id: userId, recurso_id: recursoId } });
      res.json({ mensaje: 'Añadido a favoritos', estado: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al gestionar favorito' });
  }
};