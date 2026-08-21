import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; // 1. Importer cors
import studentRoutes from './routes/studentRoutes';
import { CustomError } from './models/studentModel';

const app = express();

// 2. Activer CORS (autorise toutes les origines par défaut, ou configure selon ton frontend)
app.use(cors());

app.use(express.json());

app.use('/students', studentRoutes);

app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    succes: false,
    code: status,
    message: err.message || "Erreur serveur"
  });
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));