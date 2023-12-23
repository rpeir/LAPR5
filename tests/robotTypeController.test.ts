import * as sinon from "sinon";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Result } from "../src/core/logic/Result";
import RobotTypeController from "../src/controllers/robotTypeController";
import IRobotTypeService from "../src/services/IServices/IRobotTypeService";
import { IRobotTypeDTO } from "../src/dto/IRobotTypeDTO";
import { RobotType } from "../src/domain/robotType/robotType";
import { UniqueEntityID } from "../src/core/domain/UniqueEntityID";
import { RobotTypeName } from "../src/domain/robotType/robotTypeName";
import { RobotTypeModel } from "../src/domain/robotType/robotTypeModel";
import { RobotTypeBrand } from "../src/domain/robotType/robotTypeBrand";


describe("robotType controller", function() {


  const sandbox = sinon.createSandbox();
  beforeEach(function() {
    Container.reset();
    this.timeout(50000);
    let robotTypeSchemaInstance = require("../src/persistence/schemas/robotTypeSchema").default;
    Container.set("robotTypeSchema", robotTypeSchemaInstance);

    let robotTypeRepoClass = require("../src/repos/robotTypeRepo").default;
    let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
    Container.set("RobotTypeRepo", robotTypeRepoInstance);

    let robotTypeServiceClass = require("../src/services/robotTypeService").default;
    let robotTypeServiceInstance = Container.get(robotTypeServiceClass);

    Container.set("RobotTypeService", robotTypeServiceInstance);

  });
  afterEach(function() {
    sandbox.restore();
  });


  it("robotTypeController unit test (create) using robotTypeService stub", async function() {
    // Arrange

    let body = {
      "name": "Verstapen",
      "taskTypes": ["delivery"],
      "robotTypeModel": "RB13",
      "brand": "RB"
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


    let robotTypeServiceInstance = Container.get("RobotTypeService");
    sinon.stub(robotTypeServiceInstance, "createRobotType").returns(Result.ok<IRobotTypeDTO>({
      "id": "123",
      "name": req.body.name,
      "taskTypes": req.body.taskTypes,
      "robotTypeModel": req.body.robotTypeModel,
      "brand": req.body.brand
    }));


    const ctrl = new RobotTypeController(robotTypeServiceInstance as IRobotTypeService);

    // Act
    await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "taskTypes": req.body.taskTypes,
      "robotTypeModel": req.body.robotTypeModel,
      "brand": req.body.brand
    }));
  });

  it("robotTypeController + robotTypeService integration test (create) using robotTypeRepository and robotType stubs", async function() {
    // Arrange
    let body = {
      "name": "Marko",
      "taskTypes": ["delivery"],
      "robotTypeModel": "RB13",
      "brand": "RB"
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

    let createStub = sinon.stub(RobotType, "create").returns(Result.ok({
      "id": "123",
      "name": RobotTypeName.create(req.body.name).getValue(),
      "taskTypes": req.body.taskTypes,
      "robotTypeModel": RobotTypeModel.create(req.body.robotTypeModel).getValue(),
      "brand": RobotTypeBrand.create(req.body.brand).getValue()
    }));

    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create({
        "name": RobotTypeName.create(req.body.name).getValue(),
        "taskTypes": req.body.taskTypes,
        "robotTypeModel": RobotTypeModel.create(req.body.robotTypeModel).getValue(),
        "brand": RobotTypeBrand.create(req.body.brand).getValue()
      }, new UniqueEntityID("123")).getValue());
    }));


    let robotTypeServiceInstance = Container.get("RobotTypeService");

    const ctrl = new RobotTypeController(robotTypeServiceInstance as IRobotTypeService);


    // Act
    await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "taskTypes": req.body.taskTypes,
      "robotTypeModel": req.body.robotTypeModel,
      "brand": req.body.brand
    }));

    createStub.restore();
  });

  it("robotTypeController + robotTypeService + robotType integration test (create) with robotTypeRepo", async function() {
    // Arrange
    let body = {
      "name": "Marko",
      "taskTypes": ["delivery"],
      "robotTypeModel": "RB13",
      "brand": "RB"
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
    sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create({
        "name": RobotTypeName.create(req.body.name).getValue(),
        "taskTypes": req.body.taskTypes,
        "robotTypeModel": RobotTypeModel.create(req.body.robotTypeModel).getValue(),
        "brand": RobotTypeBrand.create(req.body.brand).getValue()
      }, new UniqueEntityID("123")).getValue());
    }));


    let robotTypeServiceInstance = Container.get("RobotTypeService");

    const ctrl = new RobotTypeController(robotTypeServiceInstance as IRobotTypeService);


    // Act
    await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "id": "123",
      "name": req.body.name,
      "taskTypes": req.body.taskTypes,
      "robotTypeModel": req.body.robotTypeModel,
      "brand": req.body.brand
    }));

  });

});
