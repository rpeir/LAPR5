import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

import config from "../../config";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const userSchema = {
    // compare with the approach followed in repos and services
    name: "userSchema",
    schema: "../persistence/schemas/userSchema"
  };

  const userRequestSchema={
    name:"userRequestSchema",
    schema:"../persistence/schemas/userRequestSchema"
  }

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: "roleSchema",
    schema: "../persistence/schemas/roleSchema"
  };

  const robotTypeSchema = {
    name: "robotTypeSchema",
    schema: "../persistence/schemas/robotTypeSchema"
  };

  const robotSchema = {
    name: "robotSchema",
    schema: "../persistence/schemas/robotSchema"
  };
  const buildingSchema = {
    name: "buildingSchema",
    schema: "../persistence/schemas/buildingSchema"
  };

  const floorSchema = {
    name: "floorSchema",
    schema: "../persistence/schemas/floorSchema"
  };
  const elevatorSchema = {
    name: "elevatorSchema",
    schema: "../persistence/schemas/elevatorSchema"
  };

  const pathwaySchema = {
    name: "pathwaySchema",
    schema: "../persistence/schemas/pathwaySchema"
  };

  const roomSchema = {
    name : "roomSchema",
    schema : "../persistence/schemas/roomSchema"
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  };

  const userRequestController={
    name:config.controllers.userRequest.name,
    path:config.controllers.userRequest.path
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path
  };

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  };

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  };

  const floorController ={
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  };
  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  };

  const pathwayController = {
    name: config.controllers.pathway.name,
    path: config.controllers.pathway.path
  }

  const roomController = {
    name : config.controllers.room.name,
    path : config.controllers.room.path
  }

  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path
  }

  const taskController = {
    name: config.controllers.task.name,
    path: config.controllers.task.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  };
  const userRequestRepo={
    name: config.repos.userRequest.name,
    path: config.repos.userRequest.path,
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  };

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  };
  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  };

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  };
  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  };

  const pathwayRepo = {
    name: config.repos.pathway.name,
    path: config.repos.pathway.path
  }

  const roomRepo = {
    name : config.repos.room.name,
    path : config.repos.room.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  };

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path
  };

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  };
  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  };

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  };
  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  };

  const pathwayService = {
    name: config.services.pathway.name,
    path: config.services.pathway.path
  }

  const roomService = {
    name : config.services.room.name,
    path : config.services.room.path
  }

  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path
  }

  const taskService = {
    name: config.services.task.name,
    path: config.services.task.path
  }

  const planningAdapter = {
    name: config.adapters.planningAdapter.name,
    path: config.adapters.planningAdapter.path
  }

  const taskAdapter = {
    name: config.adapters.taskAdapter.name,
    path: config.adapters.taskAdapter.path
  };
  const userRequestService={
    name: config.services.userRequest.name,
    path: config.services.userRequest.path
  }
  const userService={
    name:config.services.user.name,
    path:config.services.user.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      robotTypeSchema,
      robotSchema,
      buildingSchema,
      floorSchema,
      elevatorSchema,
      pathwaySchema,
      roomSchema,
      userRequestSchema,
    ],

    controllers: [
      roleController,
      robotTypeController,
      robotController,
      buildingController,
      floorController,
      pathwayController,
      elevatorController,
      roomController,
      planningController,
      userRequestController,
      taskController,
    ],

    repos: [
      roleRepo,
      userRepo,
      robotTypeRepo,
      robotRepo,
      buildingRepo,
      floorRepo,
      elevatorRepo,
      pathwayRepo,
      roomRepo,
      userRequestRepo
    ],

    services: [
      roleService,
      robotTypeService,
      robotService,
      buildingService,
      floorService,
      pathwayService,
      elevatorService,
      roomService,
      planningService,
      userRequestService,
      userService,
      taskService,
    ],

    adapters: [
      planningAdapter,
      taskAdapter
    ]
  });
  Logger.info("✌️ Schemas, Controllers, Repositories, Services, etc. loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
