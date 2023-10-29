import * as sinon from "sinon";
import { expect } from "chai";
import { Container } from "typedi";
import { BuildingId } from "../../../src/domain/building/buildingId";
import { Building } from "../../../src/domain/building/building";
import { BuildingCode } from "../../../src/domain/building/BuildingCode";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { Floor } from "../../../src/domain/floor";
import { Result } from "../../../src/core/logic/Result";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import IFloorRepo from "../../../src/services/IRepos/IFloorRepo";
import FloorService from "../../../src/services/floorService";
import IPathwayRepo from "../../../src/services/IRepos/IPathwayRepo";
import { IFloorDTO } from "../../../src/dto/IFloorDTO";
import { Pathway } from "../../../src/domain/pathway";
import PathwayService from "../../../src/services/pathwayService";
import { IPathwayDTO } from "../../../src/dto/IPathwayDTO";

describe("floor service", function() {
  const sandbox = sinon.createSandbox();
  beforeEach(function() {
    Container.reset();
    this.timeout(50000);

    let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let pathwaySchemaInstance = require("../../../src/persistence/schemas/pathwaySchema").default;
    Container.set("pathwaySchema", pathwaySchemaInstance);

    let floorRepoClass = require("../../../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
    let buildingRepoIInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoIInstance);

    let pathwayRepoClass = require("../../../src/repos/pathwayRepo").default;
    let pathwayRepoInstance = Container.get(pathwayRepoClass);
    Container.set("PathwayRepo", pathwayRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("floorService unit test (create) using buildingRepo, floor and floorRepo stub ", async function() {
    //Arrange
    let floorDTO = {
      "floorNr": 1,
      "building": "desgi2",
      "description": "salas"
    };

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, "findByDesignation").returns(new Promise<BuildingId>((resolve, reject) => {
      resolve(Building.create({
        code: BuildingCode.create("CODE3").getValue(),
        designation: floorDTO.building,
        description: "Building description",
        length: 10,
        width: 10,
        height: 5
      }, new UniqueEntityID("123")).getValue());
    }));

    let createStub = sinon.stub(Floor, "create").returns(Result.ok({
      "domainId": "123",
      "floorNr": floorDTO.floorNr,

      "building": Building.create({
        code: BuildingCode.create("CODE3").getValue(),
        designation: floorDTO.building,
        description: "Building description",
        length: 10,
        width: 10,
        height: 5
      }, new UniqueEntityID("123")).getValue(),

      "description": floorDTO.description
    }));

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, "save").returns(new Promise<BuildingId>((resolve, reject) => {
      resolve(Floor.create({
        "floorNr": floorDTO.floorNr,

        "building": Building.create({
          code: BuildingCode.create("CODE3").getValue(),
          designation: floorDTO.building,
          description: "Building description",
          length: 10,
          width: 10,
          height: 5
        }, new UniqueEntityID("123")).getValue(),

        "description": floorDTO.description
      }, new UniqueEntityID("123")).getValue());
    }));

    let  pathwayRepoInstance = Container.get("PathwayRepo");

    const floorService = new FloorService(buildingRepoInstance as IBuildingRepo, floorRepoInstance as IFloorRepo, pathwayRepoInstance as IPathwayRepo);

    await floorService.createFloor(floorDTO as IFloorDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "floorNr": floorDTO.floorNr,
        "building": floorDTO.building,
        "description": floorDTO.description
      });
    });

    createStub.restore();

  });

  it("floorService + floor integration  test (create) using buildingRepo and floorRepo stub ", async function() {
    //Arrange
    let floorDTO = {
      "floorNr": 1,
      "building": "desgi2",
      "description": "salas"
    };

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, "findByDesignation").returns(new Promise<BuildingId>((resolve, reject) => {
      resolve(Building.create({
        code: BuildingCode.create("CODE3").getValue(),
        designation: floorDTO.building,
        description: "Building description",
        length: 10,
        width: 10,
        height: 5
      }, new UniqueEntityID("123")).getValue());
    }));

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, "save").returns(new Promise<BuildingId>((resolve, reject) => {
      resolve(Floor.create({
        "floorNr": floorDTO.floorNr,

        "building": Building.create({
          code: BuildingCode.create("CODE3").getValue(),
          designation: floorDTO.building,
          description: "Building description",
          length: 10,
          width: 10,
          height: 5
        }, new UniqueEntityID("123")).getValue(),

        "description": floorDTO.description
      }, new UniqueEntityID("123")).getValue());
    }));

    let buildingRepo = Container.get("BuildingRepo");
    let floorRepo = Container.get("FloorRepo");
    let pathwayRepo = Container.get("PathwayRepo");

    const floorService = new FloorService(buildingRepo as IBuildingRepo, floorRepo as IFloorRepo, pathwayRepo as IPathwayRepo);

    await floorService.createFloor(floorDTO as IFloorDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "floorNr": floorDTO.floorNr,
        "building": floorDTO.building,
        "description": floorDTO.description
      });
    });

  })

});
