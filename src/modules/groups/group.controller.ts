import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GroupService } from './group.service';

export class GroupController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, createdBy } = request.body;
      const groupService = container.resolve(GroupService);
      const group = await groupService.create({ name, createdBy });
      return response.status(201).json(group);
    } catch (err: any) {
      return response.status(400).json({ message: err.message });
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const groupService = container.resolve(GroupService);
      const groups = await groupService.list();
      return response.json(groups);
    } catch (err: any) {
      return response.status(400).json({ message: err.message });
    }
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const groupService = container.resolve(GroupService);
      const group = await groupService.findById(Number(id));
      return response.json(group);
    } catch (err: any) {
      if (err.message === 'Group not found.') {
        return response.status(404).json({ message: err.message });
      }
      return response.status(400).json({ message: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const data = request.body;
      const groupService = container.resolve(GroupService);
      const group = await groupService.update(Number(id), data);
      return response.json(group);
    } catch (err: any) {
      if (err.message === 'Group not found.') {
        return response.status(404).json({ message: err.message });
      }
      return response.status(400).json({ message: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const groupService = container.resolve(GroupService);
      await groupService.delete(Number(id));
      return response.status(204).send();
    } catch (err: any) {
      if (err.message === 'Group not found.') {
        return response.status(404).json({ message: err.message });
      }
      return response.status(400).json({ message: err.message });
    }
  }
}