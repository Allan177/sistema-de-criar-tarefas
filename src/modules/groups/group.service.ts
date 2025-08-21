import { injectable, inject } from 'tsyringe';
import { Group } from '@prisma/client';
import { IGroupsRepository } from './group.repository';

// DTO para tipar os dados de entrada
interface ICreateGroupDTO {
  name: string;
  createdBy: number; // ID do usuário que está criando o grupo
}

@injectable()
export class GroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository
  ) {}

  public async create(data: ICreateGroupDTO): Promise<Group> {
    // Futuramente, poderíamos adicionar regras de negócio aqui, como:
    // - Verificar se o usuário 'createdBy' existe.
    // - Limitar o número de grupos que um usuário pode criar.

    const group = await this.groupsRepository.create(data);
    return group;
  }
}