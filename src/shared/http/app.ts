import 'reflect-metadata'; // Precisa ser importado no topo!
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { routes } from './routes'; // Criaremos em breve
import '../container'; // Executa nosso setup de injeção de dependência

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes); // Prefixo para todas as rotas da API

// Middleware de tratamento de erros (exemplo simples)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  // Adicionar lógica de erro mais robusta aqui depois
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };