import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

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

  const tipoRobotSchema = {
    name: 'tipoRobotSchema',
    schema: '../persistence/schemas/tipoRobotSchema',
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const tipoRobotController = {
    name: config.controllers.tipoRobot.name,
    path: config.controllers.tipoRobot.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const tipoRobotRepo = {
    name: config.repos.tipoRobot.name,
    path: config.repos.tipoRobot.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const tipoRobotService = {
    name: config.services.tipoRobot.name,
    path: config.services.tipoRobot.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      tipoRobotSchema
    ],
    controllers: [
      roleController,
      tipoRobotController
    ],
    repos: [
      roleRepo,
      userRepo,
      tipoRobotRepo
    ],
    services: [
      roleService,
      tipoRobotService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
