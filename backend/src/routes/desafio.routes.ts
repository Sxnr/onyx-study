import { Router } from 'express';
import { obtenerDesafios, obtenerDesafioPorId, completarDesafio } from '../controllers/desafio.controller';
import { verificarToken } from '../middlewares/auth.middleware';


const router = Router();

// Protegemos la ruta para que solo usuarios logueados vean los retos
router.get('/', verificarToken, obtenerDesafios);
router.get('/:id', verificarToken, obtenerDesafioPorId);
router.post('/completar', verificarToken, completarDesafio);
export default router;