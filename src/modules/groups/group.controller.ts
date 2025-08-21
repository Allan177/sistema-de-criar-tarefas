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
}