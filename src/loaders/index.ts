import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import { TipoTarefa } from '../domain/tipoTarefa';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const tipoTarefaSchema = {
    name: 'tipoTarefaSchema',
    schema: '../persistence/schemas/tipoTarefaSchema',
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const TipoTarefaRepo = {
    name: config.repos.tipoTarefa.name,
    path: config.repos.tipoTarefa.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema
    ],
    controllers: [
      roleController
    ],
    repos: [
      roleRepo,
      userRepo,
      TipoTarefaRepo
    ],
    services: [
      roleService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
