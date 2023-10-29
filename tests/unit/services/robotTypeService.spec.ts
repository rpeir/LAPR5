import { Container } from "typedi";
import * as sinon from "sinon";
import { RobotType } from "../../../src/domain/robotType";
import { Result } from "../../../src/core/logic/Result";
import { RobotTypeName } from "../../../src/domain/robotTypeName";
import { RobotTypeModel } from "../../../src/domain/robotTypeModel";
import { RobotTypeBrand } from "../../../src/domain/robotTypeBrand";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { IRobotTypeDTO } from "../../../src/dto/IRobotTypeDTO";
import RobotTypeService from "../../../src/services/robotTypeService";
import IRobotTypeRepo from "../../../src/services/IRepos/IRobotTypeRepo";
import { TaskType } from "../../../src/domain/taskType";
import { expect } from 'chai';

describe("robotType service", function() {
  const sandbox = sinon.createSandbox();
  beforeEach(function() {
    Container.reset();
    this.timeout(50000);

    let robotTypeSchemaInstance = require("../../../src/persistence/schemas/robotTypeSchema").default;
    Container.set("robotTypeSchema", robotTypeSchemaInstance);

    let robotTypeRepoClass = require("../../../src/repos/robotTypeRepo").default;
    let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
    Container.set("RobotTypeRepo", robotTypeRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });


  it("robotTypeService unit test (create) using robotTypeRepository and robotType stubs", async function() {
    // Arrange
    let robotTypeDTO = {
      "name": "Marko",
      "taskTypes": ["delivery"],
      "robotTypeModel": "RB13",
      "brand": "RB"
    } as IRobotTypeDTO;



    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create({
        "name": RobotTypeName.create(robotTypeDTO.name).getValue(),
        "taskTypes": [TaskType.delivery],
        "robotTypeModel": RobotTypeModel.create(robotTypeDTO.robotTypeModel).getValue(),
        "brand": RobotTypeBrand.create(robotTypeDTO.brand).getValue()
      }, new UniqueEntityID("123")).getValue());
    }));

    let createStub = sinon.stub(RobotType, "create").returns(Result.ok({
      "id": "123",
      "name": RobotTypeName.create(robotTypeDTO.name).getValue(),
      "taskTypes": robotTypeDTO.taskTypes,
      "robotTypeModel": RobotTypeModel.create(robotTypeDTO.robotTypeModel).getValue(),
      "brand": RobotTypeBrand.create(robotTypeDTO.brand).getValue()
    }));



    let robotTypeRepo = Container.get("RobotTypeRepo");

    const robotTypeService = new RobotTypeService(robotTypeRepo as IRobotTypeRepo);


    // Act
    await robotTypeService.createRobotType(robotTypeDTO as IRobotTypeDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "id": "123",
        "name": robotTypeDTO.name,
        "taskTypes": robotTypeDTO.taskTypes,
        "robotTypeModel": robotTypeDTO.robotTypeModel,
        "brand": robotTypeDTO.brand,
      });
    });

    createStub.restore();


  })

  it("robotTypeService + robotType integration  test (create) using robotTypeRepository stubs", async function() {
    // Arrange
    let robotTypeDTO = {
      "name": "Marko",
      "taskTypes": ["delivery"],
      "robotTypeModel": "RB13",
      "brand": "RB"
    } as IRobotTypeDTO;



    let robotTypeRepoInstance = Container.get("RobotTypeRepo");
    let createStub = sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
      resolve(RobotType.create({
        "name": RobotTypeName.create(robotTypeDTO.name).getValue(),
        "taskTypes": [TaskType.delivery],
        "robotTypeModel": RobotTypeModel.create(robotTypeDTO.robotTypeModel).getValue(),
        "brand": RobotTypeBrand.create(robotTypeDTO.brand).getValue()
      }, new UniqueEntityID("123")).getValue());
    }));


    let robotTypeRepo = Container.get("RobotTypeRepo");

    const robotTypeService = new RobotTypeService(robotTypeRepo as IRobotTypeRepo);


    // Act
    await robotTypeService.createRobotType(robotTypeDTO as IRobotTypeDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "id": "123",
        "name": robotTypeDTO.name,
        "taskTypes": robotTypeDTO.taskTypes,
        "robotTypeModel": robotTypeDTO.robotTypeModel,
        "brand": robotTypeDTO.brand,
      });
    });

    createStub.restore();


  })


});
