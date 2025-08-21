import { Prisma, User } from '@prisma/client';
import prisma from '../../shared/database/prisma';

export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  listAll(): Promise<User[]>;
  update(id: number, data: IUpdateUserData): Promise<User>;
  delete(id: number): Promise<void>;
}

export class UsersRepository implements IUsersRepository {
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        groups: { include: { group: true } },
        tasksResponsible: true,
      },
    });
    return user;
  }

  public async listAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  public async update(id: number, data: IUpdateUserData): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }

  public async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}