import * as sinon from "sinon";
import {Container} from "typedi";
import {Joi} from "celebrate";
import {NextFunction, Request, Response} from "express";
import {Result} from "../src/core/logic/Result";
import {IElevatorDTO} from "../src/dto/IElevatorDTO";
import ElevatorController from "../src/controllers/elevatorController";
import IElevatorService from "../src/services/IServices/IElevatorService";
import {Elevator} from "../src/domain/elevator/elevator";
import {Robot} from "../src/domain/robot";
import {RobotNickName} from "../src/domain/robotNickName";
import {RobotCode} from "../src/domain/robotCode";
import {RobotSerialNr} from "../src/domain/robotSerialNr";
import {RobotDescription} from "../src/domain/robotDescription";
import {RobotType} from "../src/domain/robotType";
import {RobotTypeName} from "../src/domain/robotTypeName";
import {TaskType} from "../src/domain/taskType";
import {RobotTypeModel} from "../src/domain/robotTypeModel";
import {RobotTypeBrand} from "../src/domain/robotTypeBrand";
import {UniqueEntityID} from "../src/core/domain/UniqueEntityID";
describe("elevator controller", function() {
const sandbox = sinon.createSandbox();
beforeEach(function() {

  Container.reset();
  this.timeout(10000000000);

  let elevatorSchemaInstance = require("../src/persistence/schemas/elevatorSchema").default;
  Container.set("elevatorSchema", elevatorSchemaInstance);

  let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
  Container.set("buildingSchema", buildingSchemaInstance);

  let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
  Container.set("floorSchema", floorSchemaInstance);

  let elevatorRepoClass = require("../src/repos/elevatorRepo").default;
  let elevatorRepoInstance = Container.get(elevatorRepoClass);
  Container.set("ElevatorRepo", elevatorRepoInstance);

  let buildingRepoClass = require("../src/repos/buildingRepo").default;
  let buildingRepoIInstance = Container.get(buildingRepoClass);
  Container.set("BuildingRepo", buildingRepoIInstance);

  let floorRepoClass = require("../src/repos/floorRepo").default;
  let floorRepoInstance = Container.get(floorRepoClass);
  Container.set("FloorRepo", floorRepoInstance);

  let elevatorServiceClass = require("../src/services/elevatorService").default;
  let elevatorServiceInstance = Container.get(elevatorServiceClass);
  Container.set("ElevatorService", elevatorServiceInstance);
});
  afterEach(function() {
    sandbox.restore();
});


  it("elevatorController unit test (create) using elevatorService stub", async function() {
    // Arrange
    let body = {
      "id": "fd243698-b17e-4d0e-b78c-e20aa4cc1127",
      "designation": "Elevator 2",
      "buildingDesignation": "teste A",
      "floorsServed": [
        "1",
        "2"
      ],
      "brand": "brandA",
      "modelE": "modelA",
      "serialNumber": "1234",
      "description": "Elevator 1A",
    };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {
    };
    let elevatorServiceInstance = Container.get("ElevatorService");
    sinon.stub(elevatorServiceInstance, "createElevator").returns(Result.ok<IElevatorDTO>({
      "id": req.body.id,
      "code": "2",
      "designation": req.body.designation,
      "buildingDesignation": req.body.buildingDesignation,
      "floorsServed": req.body.floorsServed,
      "brand": req.body.brand,
      "modelE": req.body.modelE,
      "serialNumber": req.body.serialNumber,
      "description": req.body.description,
    }));
    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);
    await ctrl.createElevator(req as Request, res as Response, next as NextFunction);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": req.body.id,
      "code": "2",
      "designation": req.body.designation,
      "buildingDesignation": req.body.buildingDesignation,
      "floorsServed": req.body.floorsServed,
      "brand": req.body.brand,
      "modelE": req.body.modelE,
      "serialNumber": req.body.serialNumber,
      "description": req.body.description,
    }));
  });
    it("elevatorController + elevatorService integration test (create) using elevatorRepo stub", async function() {
      // Arrange
        let body = {
            "id": "fd243698-b17e-4d0e-b78c-e20aa4cc1127",
            "designation": "Elevator 2",
            "buildingDesignation": "teste A",
            "floorsServed": [
            1,
            2
            ],
            "brand": "brandA",
            "modelE": "modelA",
            "serialNumber": "1234",
            "description": "Elevator 1A",
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {
        };
        let elevatorRepoInstance = Container.get("ElevatorRepo");
        sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
            resolve(Elevator.create({
            code: 2,
            designation:req.body.designation,
            buildingDesignation: req.body.buildingDesignation,
            floorsServed: req.body.floorsServed,
            brand: req.body.brand,
            modelE: req.body.modelE,
            serialNumber: req.body.serialNumber,
            description: req.body.description,
            }).getValue());
        }));
        let elevatorServiceInstance = Container.get("ElevatorService");
        const ctrl=new ElevatorController(elevatorServiceInstance as IElevatorService);
        // Act
        await ctrl.createElevator(<Request>req,<Response>res,<NextFunction>next);
        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "code": 2,
            "designation":req.body.designation,
            "buildingDesignation": req.body.buildingDesignation,
            "floorsServed": req.body.floorsServed,
            "brand": req.body.brand,
            "modelE": req.body.modelE,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
        }));
    });
    it("elevatorController + elevatorService unit test (list) using elevator and elevatorRepo stub", async function() {
        // Arrange
        let body = {
            "id": "fd243698-b17e-4d0e-b78c-e20aa4cc1127",
            "designation": "Elevator 2",
            "buildingDesignation": "teste A",
            "floorsServed": [
            "1",
            "2"
            ],
            "brand": "brandA",
            "modelE": "modelA",
            "serialNumber": "1234",
            "description": "Elevator 1A",
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {
        };
        let elevatorRepoInstance = Container.get("ElevatorRepo");
        sinon.stub(elevatorRepoInstance, "listElevators").returns(new Promise<Elevator[]>((resolve, reject) => {
            resolve([Elevator.create({
            "code": 2,
            "designation":req.body.designation,
            "buildingDesignation": req.body.buildingDesignation,
            "floorsServed": req.body.floorsServed,
            "brand": req.body.brand,
            "modelE": req.body.modelE,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            }).getValue()]);
        }));
        let elevatorServiceInstance = Container.get("ElevatorService");
        const ctrl=new ElevatorController(elevatorServiceInstance as IElevatorService);
        // Act
        await ctrl.listElevator(<Request>req,<Response>res,<NextFunction>next);
        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match([{
            "code": 2,
            "designation":req.body.designation,
            "buildingDesignation": req.body.buildingDesignation,
            "floorsServed": req.body.floorsServed,
            "brand": req.body.brand,
            "modelE": req.body.modelE,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
        }]));
    });
    it("elevatorController + elevatorService unit test (update) using elevator and elevatorRepo stub", async function() {
        // Arrange
        let body = {
            "id": "fd243698-b17e-4d0e-b78c-e20aa4cc1127",
            "designation": "Elevator 2",
            "buildingDesignation": "teste A",
            "floorsServed": [
            "1",
            "2"
            ],
            "brand": "brandA",
            "modelE": "modelA",
            "serialNumber": "1234",
            "description": "Elevator 1A",
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => {
        };
        sinon.stub(Elevator, "update").returns(Result.ok({
            "id": req.body.id,
            "code": 3,
            "designation":req.body.designation,
            "buildingDesignation": req.body.buildingDesignation,
            "floorsServed": req.body.floorsServed,
            "brand": req.body.brand,
            "modelE": req.body.modelE,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
        }
        ));
        let elevatorRepoInstance = Container.get("ElevatorRepo");
        sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
            resolve(Elevator.create({
            "code": 2,
            "designation":req.body.designation,
            "buildingDesignation": req.body.buildingDesignation,
            "floorsServed": req.body.floorsServed,
            "brand": req.body.brand,
            "modelE": req.body.modelE,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            }).getValue());
        }));
        let elevatorServiceInstance = Container.get("ElevatorService");
        const ctrl=new ElevatorController(elevatorServiceInstance as IElevatorService);
        // Act
        await ctrl.updateElevator(<Request>req,<Response>res,<NextFunction>next);
        // Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({
            "id": req.body.id,
            "code": 3,
            "designation":req.body.designation,
            "buildingDesignation:": req.body.buildingDesignation,
            "floorsServed": req.body.floorsServed,
            "brand": req.body.brand,
            "modelE": req.body.modelE,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
        }));
    });

});

