import { Prisma, User } from '@prisma/client';
import prisma from '../../shared/database/prisma';

// Interface para garantir o contrato (bom para testes e DI)
export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
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
}