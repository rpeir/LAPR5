import { expect } from 'chai';
import * as sinon from "sinon";
import {Container} from "typedi";
import IRoomDTO from "../src/dto/IRoomDTO";
import IRoomRepo from "../src/services/IRepos/IRoomRepo";
import IBuildingRepo from "../src/services/IRepos/IBuildingRepo";
import IFloorRepo from "../src/services/IRepos/IFloorRepo";
import {BuildingCode} from "../src/domain/building/BuildingCode";
import {Building} from "../src/domain/building/building";
import {Room} from "../src/domain/room/room";
import RoomService from "../src/services/roomService";
import {Result} from "../src/core/logic/Result";
import {NextFunction, Request, Response} from "express";
import RoomController from "../src/controllers/roomController";
import IRoomService from "../src/services/IServices/IRoomService";

describe('room controller', () => {
  const sandbox = sinon.createSandbox();

  var defaultBody;
  var defaultBuildingProps ;

  beforeEach(function() {
    Container.reset();
    this.timeout(5000);

    let roomSchemaInstance = require("../src/persistence/schemas/roomSchema").default;
    Container.set("roomSchema", roomSchemaInstance);

    let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let roomRepoClass = require("../src/repos/roomRepo").default;
    let roomRepoInstance = Container.get(roomRepoClass);
    Container.set("RoomRepo", roomRepoInstance);

    let floorRepoClass = require("../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);

    let roomServiceClass = require("../src/services/roomService").default;
    let roomServiceInstance = Container.get(roomServiceClass);
    Container.set("RoomService", roomServiceInstance);

    defaultBody = {
      name : "Test Room",
      description : "Test Description",
      category : "classroom",
      floor : 1,
      building : "A"
    }

    defaultBuildingProps = {
      code: BuildingCode.create("A").getValue(),
      designation: "A",
      description: "A",
      length: 100,
      width: 100,
      height: 100
    }

  });

  afterEach(function() {
    sandbox.restore();
  });

  it('roomController (createRoom) unit test using roomService stub', async function () {
    let req: Partial<Request> = {};
    req.body = defaultBody;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    let next: Partial<NextFunction> = () => {};


    let roomServiceInstance = Container.get("RoomService");
    sinon.stub(roomServiceInstance, "createRoom").returns(Result.ok<IRoomDTO>(defaultBody));

    const ctrl = new RoomController(roomServiceInstance as IRoomService);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledWith(res.json, sinon.match({
      name : "Test Room",
      description : "Test Description",
      category : "classroom",
      floor : 1,
      building : "A"
    }));
  });


  it('roomController + roomService (create) integration test with invalid roomCategory using stub repos', async function () {
    defaultBody.category = "Invalid Room Category";

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      Building.create(defaultBuildingProps).getValue()
    );

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    sinon.stub(roomRepoInstance, 'save').returns(
      (room : Room) => room
    );

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    let req: Partial<Request> = {};
    req.body = defaultBody;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    let next: Partial<NextFunction> = () => {};

    const ctrl = new RoomController(service as IRoomService);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    // check the status code
    sinon.assert.calledWith(res.status, 402);

  });

  it('roomController + roomService (create) integration test with invalid building', async function () {
    defaultBody.building = "Invalid";

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      null
    );

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(false);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    sinon.stub(roomRepoInstance, 'save').returns(
      null
    );

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    let req: Partial<Request> = {};
    req.body = defaultBody;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    let next: Partial<NextFunction> = () => {};

    const ctrl = new RoomController(service as IRoomService);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    // check the status code
    sinon.assert.calledWith(res.status, 402);

  });

  it('roomController + roomService (create) integration test with building with no floor', async function () {
    defaultBody.floor = 2;

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      Building.create(defaultBuildingProps).getValue()
    );

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(false);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    sinon.stub(roomRepoInstance, 'save').returns(
      (room : Room) => room
    );

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    let req: Partial<Request> = {};
    req.body = defaultBody;

    let res: Partial<Response> = {
      status: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    const ctrl = new RoomController(service as IRoomService);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    // check the status code
    sinon.assert.calledWith(res.status, 402);

  });

    it('roomController + roomService (create) integration test with valid room', async function () {
        let buildingRepoInstance = Container.get("BuildingRepo");
        sinon.stub(buildingRepoInstance, 'findByCode').returns(
          Building.create(defaultBuildingProps).getValue()
        );

        let floorRepoInstance = Container.get("FloorRepo");
        sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
          new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
        );

        let roomRepoInstance = Container.get("RoomRepo");
        sinon.stub(roomRepoInstance, 'save').returnsArg(0);

        const service = new RoomService(
        roomRepoInstance as IRoomRepo,
        floorRepoInstance as IFloorRepo,
        buildingRepoInstance as IBuildingRepo
        );

        let req: Partial<Request> = {};
        req.body = defaultBody;

        let res: Partial<Response> = {
          json: sinon.spy(),
          status: sinon.stub().returnsThis()
        };

        let next: Partial<NextFunction> = () => {};

        const ctrl = new RoomController(service as IRoomService);

        await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWith(res.status, 201);
        // check if the json is well formed
        sinon.assert.calledWith(res.json, sinon.match({
          name : "Test Room",
          description : "Test Description",
          category : "classroom",
          floor : 1,
          building : "A"
        }));
    });

  it('roomController + roomService (create) integration test with existing room', async function () {
    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      Building.create(defaultBuildingProps).getValue()
    );

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    sinon.stub(roomRepoInstance, 'save').throws('Room already exists');

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    let req: Partial<Request> = {};
    req.body = defaultBody;

    let res: Partial<Response> = {
      status: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {};

    const ctrl = new RoomController(service as IRoomService);

    await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

    // check the status code
    sinon.assert.calledWith(res.status, 402);

  });

});
