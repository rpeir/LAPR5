import { Container } from "typedi";
import { NextFunction, Request, Response } from "express";
import * as sinon from "sinon";
import { Result } from "../src/core/logic/Result";
import { IRobotDTO } from "../src/dto/IRobotDTO";
import RobotController from "../src/controllers/robotController";
import IRobotService from "../src/services/IServices/IRobotService";
import { RobotTypeName } from "../src/domain/robotTypeName";
import { TaskType } from "../src/domain/taskType";
import { RobotTypeModel } from "../src/domain/robotTypeModel";
import { RobotTypeBrand } from "../src/domain/robotTypeBrand";
import { RobotType } from "../src/domain/robotType";
import { UniqueEntityID } from "../src/core/domain/UniqueEntityID";
import { IRobotTypeDTO } from "../src/dto/IRobotTypeDTO";

describe("robot controller", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    this.timeout(50000);
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
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {

    };



    let robotServiceInstance = Container.get("RobotService");
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
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "nickName": req.body.nickName,
      "robotCode": req.body.robotCode,
      "serialNr": req.body.serialNr,
      "description": req.body.description,
      "robotType": "123",
      "state": "true"
    }));
  });
});
