import express from 'express';
import { ejecutarCodigo } from '../controllers/sandbox.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = express.Router();

// Ruta protegida para ejecutar código
router.post('/ejecutar', verificarToken, ejecutarCodigo);

export default router;