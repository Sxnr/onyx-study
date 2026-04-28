import express from 'express';
import jwt from 'jsonwebtoken';

// Extendemos explícitamente del Request de Express
export interface AuthRequest extends express.Request {
  user?: any;
}

export const verificarToken = (req: AuthRequest, res: express.Response, next: express.NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Acceso denegado. No hay pase VIP.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decodificado;
    next();
  } catch (error) {
    res.status(401).json({ error: 'El pase VIP es inválido o ha expirado.' });
  }
};