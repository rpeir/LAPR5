import { expect } from "chai";
import * as sinon from "sinon";
import { Container } from "typedi";
import { Robot } from "../../../src/domain/robot/robot";
import { Result } from "../../../src/core/logic/Result";
import { RobotNickName } from "../../../src/domain/robot/robotNickName";
import { RobotCode } from "../../../src/domain/robot/robotCode";
import { RobotSerialNr } from "../../../src/domain/robot/robotSerialNr";
import { RobotDescription } from "../../../src/domain/robot/robotDescription";
import { RobotType } from "../../../src/domain/robotType/robotType";
import { RobotTypeName } from "../../../src/domain/robotType/robotTypeName";
import { TaskType } from "../../../src/domain/taskType/taskType";
import { RobotTypeModel } from "../../../src/domain/robotType/robotTypeModel";
import { RobotTypeBrand } from "../../../src/domain/robotType/robotTypeBrand";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import RobotService from "../../../src/services/robotService";
import { IRobotDTO } from "../../../src/dto/IRobotDTO";
import IRobotRepo from "../../../src/services/IRepos/IRobotRepo";
import IRobotTypeRepo from "../../../src/services/IRepos/IRobotTypeRepo";

describe("robot service", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    this.timeout(50000);

    let robotSchemaInstance = require("../../../src/persistence/schemas/robotSchema").default;
    Container.set("robotSchema", robotSchemaInstance);

    let robotTypeSchemaInstance = require("../../../src/persistence/schemas/robotTypeSchema").default;
    Container.set("robotTypeSchema", robotTypeSchemaInstance);

    let robotRepoClass = require("../../../src/repos/robotRepo").default;
    let robotRepoInstance = Container.get(robotRepoClass);
    Container.set("RobotRepo", robotRepoInstance);

    let robotTypeRepoClass = require("../../../src/repos/robotTypeRepo").default;
    let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
    Container.set("RobotTypeRepo", robotTypeRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("robotService unit test (create) using robot, robotTypeRepo and robotRepo stubs ", async function() {
    // Arrange
    let robotDTO = {
      "nickName": "Son",
      "robotCode": "FDR46",
      "serialNr": "AS35",
      "description": "ready to work",
      "robotType": "Marko"
    };

    let createStub = sinon.stub(Robot, "create").returns(Result.ok(
      {
        "id": "124",
        "nickName": RobotNickName.create(robotDTO.nickName).getValue(),
        "robotCode": RobotCode.create(robotDTO.robotCode).getValue(),
        "serialNr": RobotSerialNr.create(robotDTO.serialNr).getValue(),
        "description": RobotDescription.create(robotDTO.description).getValue(),
        "state": true,
        "robotType": RobotType.create({
          "name": RobotTypeName.create(robotDTO.robotType).getValue(),
          "taskTypes": [TaskType.delivery],
          "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
          "brand": RobotTypeBrand.create("RB").getValue()
        }, new UniqueEntityID("123")).getValue()
      }
    ));

    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    sinon.stub(robotTypeRepoInstance, "findByName").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create(
        {
          "name": RobotTypeName.create(robotDTO.robotType).getValue(),
          "taskTypes": [TaskType.delivery],
          "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
          "brand": RobotTypeBrand.create("RB").getValue()
        }, new UniqueEntityID("123")).getValue());
    }));

    let robotRepoInstance = Container.get("RobotRepo");
    sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
      resolve(Robot.create({
          "nickName": RobotNickName.create(robotDTO.nickName).getValue(),
          "robotCode": RobotCode.create(robotDTO.robotCode).getValue(),
          "serialNr": RobotSerialNr.create(robotDTO.serialNr).getValue(),
          "description": RobotDescription.create(robotDTO.description).getValue(),
          "state": true,
          "robotType": RobotType.create({
            "name": RobotTypeName.create(robotDTO.robotType).getValue(),
            "taskTypes": [TaskType.delivery],
            "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
            "brand": RobotTypeBrand.create("RB").getValue()
          }, new UniqueEntityID("123")).getValue()
        }
        , new UniqueEntityID("123")).getValue());
    }));

    const robotTypeRepo = Container.get("RobotTypeRepo");
    const robotRepo = Container.get("RobotRepo");

    const robotService = new RobotService(robotRepo as IRobotRepo, robotTypeRepo as IRobotTypeRepo);
    // Act
    await robotService.createRobot(robotDTO as IRobotDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "id": "124",
        "state": "true",
        "nickName": robotDTO.nickName,
        "robotCode": robotDTO.robotCode,
        "serialNr": robotDTO.serialNr,
        "description": robotDTO.description,
        "robotType": robotDTO.robotType
      });
    });

    createStub.restore();

  });


  it("robotService + robot integration  test (create) using , robotTypeRepo and robotRepo stubs ", async function() {
    // Arrange
    let robotDTO = {
      "nickName": "Son",
      "robotCode": "FDR46",
      "serialNr": "AS35",
      "description": "ready to work",
      "robotType": "Marko"
    };

    let createStub = sinon.stub(Robot, "create").returns(Result.ok(
      {
        "id": "124",
        "nickName": RobotNickName.create(robotDTO.nickName).getValue(),
        "robotCode": RobotCode.create(robotDTO.robotCode).getValue(),
        "serialNr": RobotSerialNr.create(robotDTO.serialNr).getValue(),
        "description": RobotDescription.create(robotDTO.description).getValue(),
        "state": true,
        "robotType": RobotType.create({
          "name": RobotTypeName.create(robotDTO.robotType).getValue(),
          "taskTypes": [TaskType.delivery],
          "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
          "brand": RobotTypeBrand.create("RB").getValue()
        }, new UniqueEntityID("123")).getValue()
      }
    ));

    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    sinon.stub(robotTypeRepoInstance, "findByName").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create(
        {
          "name": RobotTypeName.create(robotDTO.robotType).getValue(),
          "taskTypes": [TaskType.delivery],
          "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
          "brand": RobotTypeBrand.create("RB").getValue()
        }, new UniqueEntityID("123")).getValue());
    }));

    let robotRepoInstance = Container.get("RobotRepo");
    sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
      resolve(Robot.create({
          "nickName": RobotNickName.create(robotDTO.nickName).getValue(),
          "robotCode": RobotCode.create(robotDTO.robotCode).getValue(),
          "serialNr": RobotSerialNr.create(robotDTO.serialNr).getValue(),
          "description": RobotDescription.create(robotDTO.description).getValue(),
          "state": true,
          "robotType": RobotType.create({
            "name": RobotTypeName.create(robotDTO.robotType).getValue(),
            "taskTypes": [TaskType.delivery],
            "robotTypeModel": RobotTypeModel.create("RB13").getValue(),
            "brand": RobotTypeBrand.create("RB").getValue()
          }, new UniqueEntityID("123")).getValue()
        }
        , new UniqueEntityID("123")).getValue());
    }));

    const robotTypeRepo = Container.get("RobotTypeRepo");
    const robotRepo = Container.get("RobotRepo");

    const robotService = new RobotService(robotRepo as IRobotRepo, robotTypeRepo as IRobotTypeRepo);
    // Act
    await robotService.createRobot(robotDTO as IRobotDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "id": "124",
        "state": "true",
        "nickName": robotDTO.nickName,
        "robotCode": robotDTO.robotCode,
        "serialNr": robotDTO.serialNr,
        "description": robotDTO.description,
        "robotType": robotDTO.robotType
      });
    });

    createStub.restore();
  });


});
