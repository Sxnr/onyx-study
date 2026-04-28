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
        URL_archivo: req.file.path, // Usamos tu columna original
        es_publico: esPublico === 'true', // Usamos tu columna original
        propietario_id: userId, // Usamos tu columna original
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
    const documentos = await prisma.documento.findMany({
      where: { propietario_id: userId }, // Usamos tu columna original
      orderBy: { createdAt: 'desc' }
    });
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar la bóveda.' });
  }
};