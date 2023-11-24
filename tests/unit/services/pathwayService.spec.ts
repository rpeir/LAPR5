import * as sinon from "sinon";
import { expect } from "chai";
import { Container } from "typedi";
import { Building } from "../../../src/domain/building/building";
import { BuildingCode } from "../../../src/domain/building/BuildingCode";
import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { Floor } from "../../../src/domain/floor/floor";
import { Pathway } from "../../../src/domain/pathway/pathway";
import { Result } from "../../../src/core/logic/Result";
import PathwayService from "../../../src/services/pathwayService";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import IPathwayRepo from "../../../src/services/IRepos/IPathwayRepo";
import IFloorRepo from "../../../src/services/IRepos/IFloorRepo";
import { IPathwayDTO } from "../../../src/dto/IPathwayDTO";

describe("pathway  service", function() {

  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    this.timeout(5000);

    let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let pathwaySchema = require("../../../src/persistence/schemas/pathwaySchema").default;
    Container.set("pathwaySchema", pathwaySchema);

    let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);

    let floorRepoClass = require("../../../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let pathwayRepoClass = require("../../../src/repos/pathwayRepo").default;
    let pathwayRepoInstance = Container.get(pathwayRepoClass);
    Container.set("PathwayRepo", pathwayRepoInstance);

  });

  afterEach(function() {
    sandbox.restore();
  });

  it("pathwayService unit test (create) with buildingRepo, pathwayRepo, floorRepo mocks and pathway stub ", async function() {
    // Arrange
    let pathwayDTO = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    /// TEMPS

    let buildingSource = Building.create({
      code: BuildingCode.create("124").getValue(),
      designation: pathwayDTO.buildingSource,
      description: "Building 1",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("123")).getValue();


    let buildingDestination = Building.create({
      code: BuildingCode.create("125").getValue(),
      designation: pathwayDTO.buildingDestination,
      description: "Building 2",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("125")).getValue();

    let floorSource = Floor.create({
      floorNr: pathwayDTO.floorSource,
      building: buildingSource,
      description: "Floor 1"
    }, new UniqueEntityID("123")).getValue();

    let floorDestination = Floor.create({
      floorNr: pathwayDTO.floorDestination,
      building: buildingDestination,
      description: "Floor 2"
    }, new UniqueEntityID("124")).getValue();


    /////

    let createStub = sinon.stub(Pathway, "create").returns(Result.ok({
        "id" : new UniqueEntityID("129"),
        "buildingSource": buildingSource,
        "buildingDestination": buildingDestination,
        "floorSource": floorSource,
        "floorDestination": floorDestination,
        "description": pathwayDTO.description
      },
    ));

    let buildingRepoInstance = Container.get("BuildingRepo");
    const buildingMock = sandbox.stub(buildingRepoInstance, "findByDesignation");
    buildingMock.onCall(0).returns(new Promise(resolve => resolve(buildingSource)))
      .onCall(1).returns(new Promise(resolve => resolve(buildingDestination)));

    let pathwayRepoInstance = Container.get("PathwayRepo");
    sinon.stub(pathwayRepoInstance, "existsPathwayBetweenFloors").returns(new Promise(resolve => resolve(false)));

    sinon.stub(pathwayRepoInstance, "save").returns(new Promise<Pathway>((resolve, reject) => {
      resolve(Pathway.create({
        "buildingSource":  buildingSource,
        "buildingDestination": buildingDestination,
        "floorSource": floorSource,
        "floorDestination": floorDestination,
        "description": pathwayDTO.description
      }, new UniqueEntityID("129")).getValue())
    }));


    let floorRepoInstance = Container.get("FloorRepo");
    const floorMock = sandbox.stub(floorRepoInstance, "findByBuildingIdAndFloorNr");
    floorMock.onCall(0).returns(new Promise(resolve => resolve(floorSource)))
      .onCall(1).returns(new Promise(resolve => resolve(floorDestination)));


    const pathwayService = new PathwayService(buildingRepoInstance as IBuildingRepo, floorRepoInstance as IFloorRepo, pathwayRepoInstance as IPathwayRepo);

    await pathwayService.createPathway(pathwayDTO as IPathwayDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "domainId": "129",
        "buildingSource": buildingSource.designation,
        "buildingDestination": buildingDestination.designation,
        "floorSource": floorSource.floorNr,
        "floorDestination": floorDestination.floorNr,
        "description": pathwayDTO.description
      });
    });

  });

  it("pathwayService + pathway integration  test (create) with buildingRepo, pathwayRepo and floorRepo mocks ", async function() {
    // Arrange
    let pathwayDTO = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    /// TEMPS

    let buildingSource = Building.create({
      code: BuildingCode.create("124").getValue(),
      designation: pathwayDTO.buildingSource,
      description: "Building 1",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("123")).getValue();


    let buildingDestination = Building.create({
      code: BuildingCode.create("125").getValue(),
      designation: pathwayDTO.buildingDestination,
      description: "Building 2",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("125")).getValue();

    let floorSource = Floor.create({
      floorNr: pathwayDTO.floorSource,
      building: buildingSource,
      description: "Floor 1"
    }, new UniqueEntityID("123")).getValue();

    let floorDestination = Floor.create({
      floorNr: pathwayDTO.floorDestination,
      building: buildingDestination,
      description: "Floor 2"
    }, new UniqueEntityID("124")).getValue();


    /////

    let buildingRepoInstance = Container.get("BuildingRepo");
    const buildingMock = sandbox.stub(buildingRepoInstance, "findByDesignation");
    buildingMock.onCall(0).returns(new Promise(resolve => resolve(buildingSource)))
      .onCall(1).returns(new Promise(resolve => resolve(buildingDestination)));

    let pathwayRepoInstance = Container.get("PathwayRepo");
    sinon.stub(pathwayRepoInstance, "existsPathwayBetweenFloors").returns(new Promise(resolve => resolve(false)));

    sinon.stub(pathwayRepoInstance, "save").returns(new Promise<Pathway>((resolve, reject) => {
      resolve(Pathway.create({
        "buildingSource":  buildingSource,
        "buildingDestination": buildingDestination,
        "floorSource": floorSource,
        "floorDestination": floorDestination,
        "description": pathwayDTO.description
      }, new UniqueEntityID("129")).getValue())
    }));


    let floorRepoInstance = Container.get("FloorRepo");
    const floorMock = sandbox.stub(floorRepoInstance, "findByBuildingIdAndFloorNr");
    floorMock.onCall(0).returns(new Promise(resolve => resolve(floorSource)))
      .onCall(1).returns(new Promise(resolve => resolve(floorDestination)));


    const pathwayService = new PathwayService(buildingRepoInstance as IBuildingRepo, floorRepoInstance as IFloorRepo, pathwayRepoInstance as IPathwayRepo);

    await pathwayService.createPathway(pathwayDTO as IPathwayDTO).then((result) => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        "domainId": "129",
        "buildingSource": buildingSource.designation,
        "buildingDestination": buildingDestination.designation,
        "floorSource": floorSource.floorNr,
        "floorDestination": floorDestination.floorNr,
        "description": pathwayDTO.description
      });
    });

  })


});
