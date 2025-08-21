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

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const userService = container.resolve(UserService);
      const users = await userService.list();
      return response.json(users);
    } catch (err: any) {
      return response.status(400).json({ message: err.message });
    }
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const userService = container.resolve(UserService);
      const user = await userService.findById(Number(id));
      return response.json(user);
    } catch (err: any) {
      if (err.message === 'User not found.') {
        return response.status(404).json({ message: err.message });
      }
      return response.status(400).json({ message: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const data = request.body;
      const userService = container.resolve(UserService);
      const user = await userService.update(Number(id), data);
      return response.json(user);
    } catch (err: any) {
      if (err.message === 'User not found.') {
        return response.status(404).json({ message: err.message });
      }
      return response.status(400).json({ message: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const userService = container.resolve(UserService);
      await userService.delete(Number(id));
      return response.status(204).send();
    } catch (err: any) {
      if (err.message === 'User not found.') {
        return response.status(404).json({ message: err.message });
      }
      return response.status(400).json({ message: err.message });
    }
  }
}