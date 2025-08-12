import { Router } from 'express';
import { usersRouter } from '../../modules/users/er.routes';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'API is running!' })); // Rota de teste
routes.use('/users', usersRouter); // Usa as rotas de usuário

export { routes };