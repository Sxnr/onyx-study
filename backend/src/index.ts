import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import documentoRoutes from './routes/documento.routes';
import path from 'path';
import ejecucionRoutes from './routes/ejecucion.routes';

import authRoutes from './routes/auth.routes';
import sandboxRoutes from './routes/sandbox.routes';
import bibliotecaRoutes from './routes/biblioteca.routes';
import hitoRoutes from './routes/hito.routes';
import desafioRoutes from './routes/desafio.routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sandbox', sandboxRoutes);
app.use('/api/documentos', documentoRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/ejecucion', ejecucionRoutes);
app.use('/api/biblioteca', bibliotecaRoutes);
app.use('/api/hitos', hitoRoutes);
app.use('/api/desafios', desafioRoutes);
+
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: '¡El servidor de Onyx Study está vivo!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});