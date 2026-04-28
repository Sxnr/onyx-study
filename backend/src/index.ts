import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import documentoRoutes from './routes/documento.routes';

import authRoutes from './routes/auth.routes';
import sandboxRoutes from './routes/sandbox.routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sandbox', sandboxRoutes);
app.use('/api/documentos', documentoRoutes);
+
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: '¡El servidor de Onyx Study está vivo!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});