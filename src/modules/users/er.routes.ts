import { Router } from 'express';
import { UserController } from './user.controller';

const usersRouter = Router();
const userController = new UserController();

usersRouter.post('/', userController.create);

export { usersRouter };