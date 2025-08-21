import { container } from 'tsyringe';
import { IUsersRepository, UsersRepository } from '../../modules/users/user.repository';
import { IGroupsRepository, GroupsRepository } from '../../modules/groups/group.repository';

// Registro de Users
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

// Registro do novo módulo de Grupos
container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository
);