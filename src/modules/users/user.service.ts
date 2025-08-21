import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { IUsersRepository, IUpdateUserData } from './user.repository';
import { ICreateUserDTO } from './user.dtos';

// Função utilitária para remover a senha do objeto de usuário
const removePassword = (user: User): Omit<User, 'password'> => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

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
    return removePassword(user);
  }

  public async list(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.listAll();
    return users.map(removePassword);
  }

  public async findById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new Error('User not found.');
    }
    return removePassword(user);
  }

  public async update(id: number, data: IUpdateUserData): Promise<Omit<User, 'password'>> {
    await this.findById(id); // Garante que o usuário existe

    // Se o email estiver sendo atualizado, verifica se já não está em uso por outro usuário
    if (data.email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(data.email);
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new Error('Email address already used by another user.');
      }
    }

    // Se a senha estiver sendo atualizada, faz o hash
    if (data.password) {
      data.password = await hash(data.password, 8);
    }

    const updatedUser = await this.usersRepository.update(id, data);
    return removePassword(updatedUser);
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.usersRepository.delete(id);
  }
}