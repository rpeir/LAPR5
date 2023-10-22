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
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:2649722995d4b7383714b53b@vs802.dei.isep.ipp.pt:27017/admin",

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

    tipoTarefa:{
      name: "TipoTarefaRepo",
      path: "../repos/tipoTarefaRepo"
    },

    tipoRobot:{
      name: "TipoRobotRepo",
      path: "../repos/tipoRobotRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },

    tipoRobot: {
      name: "TipoRobotService",
      path: "../services/tipoRobotService"
    }
  },
};
