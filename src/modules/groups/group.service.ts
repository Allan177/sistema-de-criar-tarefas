import { injectable, inject } from 'tsyringe';
import { Group } from '@prisma/client';
import { IGroupsRepository, IUpdateGroupData } from './group.repository';

interface ICreateGroupDTO {
  name: string;
  createdBy: number;
}

@injectable()
export class GroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository
  ) {}

  public async create(data: ICreateGroupDTO): Promise<Group> {
    // Validação futura: verificar se o 'createdBy' user existe
    const group = await this.groupsRepository.create(data);
    return group;
  }

  public async list(): Promise<Group[]> {
    const groups = await this.groupsRepository.listAll();
    return groups;
  }

  public async findById(id: number): Promise<Group> {
    const group = await this.groupsRepository.findById(id);
    if (!group) {
      throw new Error('Group not found.');
    }
    return group;
  }

  public async update(id: number, data: IUpdateGroupData): Promise<Group> {
    await this.findById(id); // Garante que o grupo existe
    const group = await this.groupsRepository.update(id, data);
    return group;
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id); // Garante que o grupo existe
    await this.groupsRepository.delete(id);
  }
}