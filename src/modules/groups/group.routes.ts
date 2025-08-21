// src/modules/groups/group.routes.ts

import { Router } from 'express';
import { GroupController } from './group.controller';

const groupsRouter = Router();
const groupController = new GroupController();

// A única rota que temos implementada por enquanto é a de criação
groupsRouter.post('/', groupController.create);

export { groupsRouter };