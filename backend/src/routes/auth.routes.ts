import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { verificarToken, AuthRequest } from '../middlewares/auth.middleware';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// --- ZONA VIP ---
// Declaramos que req y res son 100% de express
router.get('/perfil', verificarToken, (req: express.Request, res: express.Response) => {
  
  // Hacemos un "doble salto" seguro para que TypeScript no llore por las diferencias
  const reqConToken = req as unknown as AuthRequest;

  res.json({ 
    message: '¡Bienvenido a la zona protegida de Onyx Study!',
    datosDelToken: reqConToken.user 
  });
});

export default router;