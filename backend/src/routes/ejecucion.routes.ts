import { Router } from 'express';
import { ejecutarCodigo, explicarErrorIA } from '../controllers/ejecucion.controller';

const router = Router();

router.post('/run', ejecutarCodigo);
router.post('/explicar', explicarErrorIA);

export default router;