import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const subirDocumento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, esPublico } = req.body;
    const userId = (req as any).user.userId;

    if (!req.file) {
      res.status(400).json({ error: 'No se ha subido ningún archivo.' });
      return;
    }

    const nuevoDoc = await prisma.documento.create({
      data: {
        titulo: titulo || req.file.originalname,
        URL_archivo: req.file.path,
        es_publico: esPublico === 'true',
        propietario_id: userId,
        etiquetas: [] 
      }
    });

    res.status(201).json({ message: 'Archivo guardado en la bóveda', documento: nuevoDoc });
  } catch (error) {
    console.error('Error al subir documento:', error);
    res.status(500).json({ error: 'Error interno al procesar el archivo.' });
  }
};

export const obtenerMisDocumentos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { q } = req.query; // Capturamos el parámetro de búsqueda si existe

    const documentos = await prisma.documento.findMany({
      where: { 
        propietario_id: userId,
        ...(q ? {
          OR: [
            { titulo: { contains: q as string, mode: 'insensitive' } },
            { etiquetas: { has: q as string } } // Búsqueda avanzada por etiquetas
          ]
        } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ error: 'Error al recuperar la bóveda.' });
  }
};