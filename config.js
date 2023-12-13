import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({path: `.env.${process.env.NODE_ENV}`});
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
  databaseURL: process.env.MONGODB_URI || 'mongodb://g008:sapo1234@vsgate-s1.dei.isep.ipp.pt:10802/db',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * Port of planning server
   */
  planningPort: parseInt(process.env.PLANNING_PORT, 10) || 5000,

  /**
   * Host of planning server
   */
  planningHost: process.env.PLANNING_HOST || 'vs1141.dei.isep.ipp.pt',

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },

    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },

    robot: {
      name: 'RobotController',
      path: '../controllers/robotController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    userRequest: {
      name:'UserRequestController',
      path:'../controllers/userRequestController'
    },

    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },

    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },

    pathway: {
      name: 'PathwayController',
      path: '../controllers/pathwayController',
    },

    room: {
      name: 'RoomController',
      path: '../controllers/roomController',
    },

    planning: {
      name: 'PlanningController',
      path: '../controllers/planningController',
    }
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },

    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },

    userRequest:{
      name:'userRequestRepo',
      path:'../repos/userRequestRepo'
    },

    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },

    robot: {
      name: 'RobotRepo',
      path: '../repos/robotRepo',
    },

    building: {
      name: 'BuildingRepo',
      path: '../repos/buildingRepo',
    },

    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },

    pathway: {
      name: 'PathwayRepo',
      path: '../repos/pathwayRepo',
    },

    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },

    room: {
      name: 'RoomRepo',
      path: '../repos/roomRepo',
    },
  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },

    robotType: {
      name: 'robotTypeService',
      path: '../services/robotTypeService',
    },

    robot: {
      name: 'RobotService',
      path: '../services/robotService',
    },

    building: {
      name: 'BuildingService',
      path: '../services/buildingService',
    },

    floor: {
      name: 'FloorService',
      path: '../services/floorService',
    },

    pathway: {
      name: 'PathwayService',
      path: '../services/pathwayService',
    },

    elevator: {
      name: 'ElevatorService',
      path: '../services/elevatorService',
    },

    user: {
      name: 'UserService',
      path: '../services/userService',
    },
    userRequest:{
      name:'UserRequestService',
      path:'../services/userRequestService'
    },

    room: {
      name: 'RoomService',
      path: '../services/roomService',
    },

    planning: {
      name: 'PlanningService',
      path: '../services/planningService',
    },
  },

  connections:{
    planningConnection: {
      name: 'PlanningConnection',
      path: '../connections/planningConnection',
    }
  }
};
