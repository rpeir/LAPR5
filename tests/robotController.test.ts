import { Container } from "typedi";
import { NextFunction, Request, Response } from "express";
import sinon from "sinon";
import { Result } from "../src/core/logic/Result";
import { IRobotDTO } from "../src/dto/IRobotDTO";
import RobotController from "../src/controllers/robotController";
import IRobotService from "../src/services/IServices/IRobotService";
import { RobotTypeName } from "../src/domain/robotType/robotTypeName";
import { TaskType } from "../src/domain/taskType/taskType";
import { RobotTypeModel } from "../src/domain/robotType/robotTypeModel";
import { RobotTypeBrand } from "../src/domain/robotType/robotTypeBrand";
import { RobotType } from "../src/domain/robotType/robotType";
import { UniqueEntityID } from "../src/core/domain/UniqueEntityID";
import { Robot } from "../src/domain/robot/robot";
import { RobotNickName } from "../src/domain/robot/robotNickName";
import { RobotCode } from "../src/domain/robot/robotCode";
import { RobotSerialNr } from "../src/domain/robot/robotSerialNr";
import { RobotDescription } from "../src/domain/robot/robotDescription";

describe("robot controller", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    this.timeout(1000000);
    let robotSchemaInstance = require("../src/persistence/schemas/robotSchema").default;
    Container.set("robotSchema", robotSchemaInstance);

    let robotTypeSchemaInstance = require("../src/persistence/schemas/robotTypeSchema").default;
    Container.set("robotTypeSchema", robotTypeSchemaInstance);

    let robotRepoClass = require("../src/repos/robotRepo").default;
    let robotRepoInstance = Container.get(robotRepoClass);
    Container.set("RobotRepo", robotRepoInstance);

    let robotTypeRepoClass = require("../src/repos/robotTypeRepo").default;
    let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
    Container.set("RobotTypeRepo", robotTypeRepoInstance);

    let robotServiceClass = require("../src/services/robotService").default;
    let robotServiceInstance = Container.get(robotServiceClass);
    Container.set("RobotService", robotServiceInstance);

  });

  afterEach(function() {
    sandbox.restore();
  });


  it("robotController unit test (create) using robotService stub", async function() {
    // Arrange

    let body = {
      "nickName": "Son",
      "robotCode": "FDR46",
      "serialNr": "AS35",
      "description": "ready to work",
      "robotType": "TipoA"
    };
    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "fleet manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    let next: Partial<NextFunction> = () => {

    };


    let robotServiceInstance = Container.get("RobotService");
    // @ts-ignore
    sinon.stub(robotServiceInstance, "createRobot").returns(Result.ok<IRobotDTO>({
      "nickName": req.body.nickName,
      "robotCode": req.body.robotCode,
      "serialNr": req.body.serialNr,
      "description": req.body.description,
      "robotType": "123",
      "state": "true"
    }));

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    // @ts-ignore
    sinon.assert.calledOnce(res.json);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match({
      "nickName": req.body.nickName,
      "robotCode": req.body.robotCode,
      "serialNr": req.body.serialNr,
      "description": req.body.description,
      "robotType": "123",
      "state": "true"
    }));
  });

  it("robotController + robotService unit test (create) using robot, robotTypeRepo and robotRepo stubs ", async function() {
    // Arrange
    let body = {
      "nickName": "Son",
      "robotCode": "FDR46",
      "serialNr": "AS35",
      "description": "ready to work",
      "robotType": "TipoA"
    };
    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "fleet manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    let next: Partial<NextFunction> = () => {

    };

    // @ts-ignore
    let createStub = sinon.stub(Robot, "create").returns(Result.ok(
      {
        "id": "124",
        "nickName": RobotNickName.create(req.body.nickName).getValue(),
        "robotCode": RobotCode.create(req.body.robotCode).getValue(),
        "serialNr": RobotSerialNr.create(req.body.serialNr).getValue(),
        "description": RobotDescription.create(req.body.description).getValue(),
        "state": true,
        "robotType": RobotType.create({
            "name": RobotTypeName.create(req.body.robotType).getValue(),
            "taskTypes": [TaskType.delivery],
            "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
            "brand": RobotTypeBrand.create("RB").getValue(),
          }, new UniqueEntityID("123")).getValue()
      }
    ));

    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    // @ts-ignore
    sinon.stub(robotTypeRepoInstance, "findByName").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create(
        {
          "name": RobotTypeName.create(req.body.robotType).getValue(),
          "taskTypes": [TaskType.delivery],
          "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
          "brand": RobotTypeBrand.create("RB").getValue()
        }, new UniqueEntityID("123")).getValue());
    }));

    let robotRepoInstance = Container.get("RobotRepo");
    // @ts-ignore
    sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
      resolve(Robot.create(      {
          "nickName": RobotNickName.create(req.body.nickName).getValue(),
          "robotCode": RobotCode.create(req.body.robotCode).getValue(),
          "serialNr": RobotSerialNr.create(req.body.serialNr).getValue(),
          "description": RobotDescription.create(req.body.description).getValue(),
          "state": true,
          "robotType": RobotType.create({
            "name": RobotTypeName.create(req.body.robotType).getValue(),
            "taskTypes": [TaskType.delivery],
            "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
            "brand": RobotTypeBrand.create("RB").getValue()
          }, new UniqueEntityID("123")).getValue()
        }
        , new UniqueEntityID("123")).getValue());
    }));

    let robotServiceInstance = Container.get("RobotService");

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    // @ts-ignore
    sinon.assert.calledOnce(res.json);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match({
        "state": "true",
        "nickName": req.body.nickName,
        "robotCode": req.body.robotCode,
        "serialNr": req.body.serialNr,
        "description": req.body.description,
        "robotType": req.body.robotType
      }
    ));

    createStub.restore();
  });



  it("robotController + robotService + robot integration test (create) with robotTypeRepo and robotRepo stubs", async function() {
    // Arrange
    let body = {
      "nickName": "Son",
      "robotCode": "FDR46",
      "serialNr": "AS35",
      "description": "ready to work",
      "robotType": "TipoA"
    };
    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "fleet manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    let next: Partial<NextFunction> = () => {

    };

    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    // @ts-ignore
    sinon.stub(robotTypeRepoInstance, "findByName").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create(
        {
          "name": RobotTypeName.create(req.body.robotType).getValue(),
          "taskTypes": [TaskType.delivery],
          "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
          "brand": RobotTypeBrand.create("RB").getValue()
        }, new UniqueEntityID("123")).getValue());
    }));

    let robotRepoInstance = Container.get("RobotRepo");
    // @ts-ignore
    sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
      resolve(Robot.create(      {
          "nickName": RobotNickName.create(req.body.nickName).getValue(),
          "robotCode": RobotCode.create(req.body.robotCode).getValue(),
          "serialNr": RobotSerialNr.create(req.body.serialNr).getValue(),
          "description": RobotDescription.create(req.body.description).getValue(),
          "state": true,
          "robotType": RobotType.create({
            "name": RobotTypeName.create(req.body.robotType).getValue(),
            "taskTypes": [TaskType.delivery],
            "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
            "brand": RobotTypeBrand.create("RB").getValue()
          }, new UniqueEntityID("123")).getValue()
        }
        , new UniqueEntityID("123")).getValue());
    }));

    let robotServiceInstance = Container.get("RobotService");

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    // @ts-ignore
    sinon.assert.calledOnce(res.json);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match({
        "state": "true",
        "nickName": req.body.nickName,
        "robotCode": req.body.robotCode,
        "serialNr": req.body.serialNr,
        "description": req.body.description,
        "robotType": req.body.robotType
      }
    ));
  });


  it("robotController unit test (list) using robotService stub", async function() {
    // Arrange

    let body = {
      "nickName": "Son",
      "robotCode": "FDR46",
      "serialNr": "AS35",
      "description": "ready to work",
      "robotType": "TipoA"
    };
    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "fleet manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };
    let next: Partial<NextFunction> = () => {

    };
    let robotServiceInstance = Container.get("RobotService");
    // @ts-ignore
    sinon.stub(robotServiceInstance, "consultAllRobots").returns(Result.ok<IRobotDTO[]>([{
      "nickName": req.body.nickName,
      "robotCode": req.body.robotCode,
      "serialNr": req.body.serialNr,
      "description": req.body.description,
      "robotType": "123",
      "state": "true"
    }]));

    const ctrl = new RobotController(robotServiceInstance as IRobotService);
    await ctrl.consultAllRobots(<Request>req, <Response>res, <NextFunction>next);
    // @ts-ignore
    sinon.assert.calledWith(res.status, 200);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match([{
      "nickName": req.body.nickName,
      "robotCode": req.body.robotCode,
      "serialNr": req.body.serialNr,
      "description": req.body.description,
      "robotType": "123",
      "state": "true"
    }]));
  });

});
