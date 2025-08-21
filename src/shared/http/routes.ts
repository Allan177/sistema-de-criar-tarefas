import { Router } from 'express';
import { usersRouter } from '../../modules/users/er.routes';
import { groupsRouter } from '../../modules/groups/group.routes'; // IMPORTAR AQUI

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/groups', groupsRouter); // USAR AQUI

export { routes };