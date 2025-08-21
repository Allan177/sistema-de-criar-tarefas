import { Router } from 'express';
import { GroupController } from './group.controller';

const groupsRouter = Router();
const groupController = new GroupController();

// Create
groupsRouter.post('/', groupController.create);

// Read
groupsRouter.get('/', groupController.list);
groupsRouter.get('/:id', groupController.findById);

// Update
groupsRouter.put('/:id', groupController.update);

// Delete
groupsRouter.delete('/:id', groupController.delete);

export { groupsRouter };