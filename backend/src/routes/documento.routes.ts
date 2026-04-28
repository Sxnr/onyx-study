import express from 'express';
import multer from 'multer';
import { subirDocumento, obtenerMisDocumentos } from '../controllers/documento.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = express.Router();

// Configuración de almacenamiento local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/upload', verificarToken, upload.single('archivo'), subirDocumento);
router.get('/mis-documentos', verificarToken, obtenerMisDocumentos);

export default router;