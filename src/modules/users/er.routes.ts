import { Router } from 'express';
import { UserController } from './user.controller';

const usersRouter = Router();
const userController = new UserController();

// Create
usersRouter.post('/', userController.create);

// Read
usersRouter.get('/', userController.list);
usersRouter.get('/:id', userController.findById);

// Update
usersRouter.put('/:id', userController.update);

// Delete
usersRouter.delete('/:id', userController.delete);

export { usersRouter };