import { Prisma, Group } from '@prisma/client';
import prisma from '../../shared/database/prisma';

export interface IUpdateGroupData {
  name?: string;
}

export interface IGroupsRepository {
  create(data: { name: string; createdBy: number }): Promise<Group>;
  listAll(): Promise<Group[]>;
  findById(id: number): Promise<Group | null>;
  update(id: number, data: IUpdateGroupData): Promise<Group>;
  delete(id: number): Promise<void>;
}

export class GroupsRepository implements IGroupsRepository {
  public async create({ name, createdBy }: { name: string; createdBy: number }): Promise<Group> {
    const group = await prisma.group.create({
      data: {
        name,
        createdBy,
        users: {
          create: {
            userId: createdBy,
          },
        },
      },
      include: {
        users: true,
      },
    });
    return group;
  }

  public async listAll(): Promise<Group[]> {
    const groups = await prisma.group.findMany({
      include: {
        creator: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { users: true }, // Conta o número de membros
        },
      },
    });
    return groups;
  }

  public async findById(id: number): Promise<Group | null> {
    const group = await prisma.group.findUnique({
      where: { id },
      include: {
        creator: { select: { id: true, name: true } },
        users: {
          include: {
            user: { select: { id: true, name: true } },
          },
        },
        tasks: true,
      },
    });
    return group;
  }

  public async update(id: number, data: IUpdateGroupData): Promise<Group> {
    const group = await prisma.group.update({
      where: { id },
      data,
    });
    return group;
  }

  public async delete(id: number): Promise<void> {
    await prisma.group.delete({ where: { id } });
  }
}