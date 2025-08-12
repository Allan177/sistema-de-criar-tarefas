import { container } from 'tsyringe';
import { IUsersRepository, UsersRepository } from '../../modules/users/user.repository';

// Registramos a implementação (UsersRepository) para a abstração (IUsersRepository)
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);