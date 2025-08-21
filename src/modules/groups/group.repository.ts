import { Prisma, Group } from '@prisma/client';
import prisma from '../../shared/database/prisma';

export interface IGroupsRepository {
  create(data: { name: string, createdBy: number }): Promise<Group>;
}

export class GroupsRepository implements IGroupsRepository {
  public async create({ name, createdBy }: { name: string, createdBy: number }): Promise<Group> {
    const group = await prisma.group.create({
      data: {
        name,
        createdBy,
        // Prisma Nested Write: cria o grupo E o registro em group_users ao mesmo tempo
        users: {
          create: {
            userId: createdBy,
          },
        },
      },
      include: {
        users: true, // Inclui a lista de membros na resposta
      },
    });
    return group;
  }
}