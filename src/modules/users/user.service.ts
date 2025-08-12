import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { IUsersRepository } from './user.repository';
import { ICreateUserDTO } from './user.dtos'; // Criaremos este DTO

@injectable()
export class UserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async create({ name, email, password }: ICreateUserDTO): Promise<Omit<User, 'password'>> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Nunca retorne a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}