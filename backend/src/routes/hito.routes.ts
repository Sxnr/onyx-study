import { Router } from 'express';
import { obtenerHitos, crearHito, eliminarHito } from '../controllers/hito.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', verificarToken, obtenerHitos);
router.post('/', verificarToken, crearHito);
router.delete('/:id', verificarToken, eliminarHito);

export default router;