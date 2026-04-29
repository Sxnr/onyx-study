import { Router } from 'express';
import { ejecutarCodigo } from '../controllers/ejecucion.controller';

const router = Router();

router.post('/run', ejecutarCodigo);

export default router;