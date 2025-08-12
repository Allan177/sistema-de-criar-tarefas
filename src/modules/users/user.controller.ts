import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserService } from './user.service';

export class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const userService = container.resolve(UserService);

      const user = await userService.create({ name, email, password });

      return response.status(201).json(user);
    } catch (err: any) {
      return response.status(400).json({ message: err.message });
    }
  }
}