import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://g008:sapo1234@vsgate-s1.dei.isep.ipp.pt:10802/db",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },

    tipoRobot: {
      name: "TipoRobotController",
      path: "../controllers/tipoRobotController"
    },

    robot:{
      name: "RobotController",
      path: "../controllers/robotController"
    },
    building:{
      name: "BuildingController",
      path: "../controllers/buildingController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },

    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },

    tipoRobot: {
      name: "TipoRobotRepo",
      path: "../repos/tipoRobotRepo"
    },

    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
    building: {
      name: "BuildingRepo",
      path: "../repos/buildingRepo"
    },
  },

    services: {
      role: {
        name: "RoleService",
        path: "../services/roleService"
      },

      tipoRobot: {
        name: "TipoRobotService",
        path: "../services/tipoRobotService"
      },

      robot: {
        name: "RobotService",
        path: "../services/robotService"
      },
      building: {
        name: "BuildingService",
        path: "../services/buildingService"
      }
    },
};
