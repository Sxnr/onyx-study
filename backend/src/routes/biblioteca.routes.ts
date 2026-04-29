import { Router } from 'express';
import { obtenerRecursos, toggleFavorito } from '../controllers/biblioteca.controller';
import { verificarToken } from '../middlewares/auth.middleware'; // Cambiado el nombre aquí

const router = Router();

// Usamos el nombre correcto de la función que exportaste
router.get('/', verificarToken, obtenerRecursos);
router.post('/favorito', verificarToken, toggleFavorito);

export default router;