import { NextFunction, Request, Response } from "express";
import * as sinon from "sinon";
import { Container } from "typedi";
import { Result } from "../src/core/logic/Result";
import { IPathwayDTO } from "../src/dto/IPathwayDTO";
import PathwayController from "../src/controllers/pathwayController";
import IPathwayService from "../src/services/IServices/IPathwayService";
import { BuildingCode } from "../src/domain/building/BuildingCode";
import { Pathway } from "../src/domain/pathway";
import { Building } from "../src/domain/building/building";
import { UniqueEntityID } from "../src/core/domain/UniqueEntityID";
import { Floor } from "../src/domain/floor";

describe("pathway controller", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    this.timeout(5000);

    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let pathwaySchema = require("../src/persistence/schemas/pathwaySchema").default;
    Container.set("pathwaySchema", pathwaySchema);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);

    let floorRepoClass = require("../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let pathwayRepoClass = require("../src/repos/pathwayRepo").default;
    let pathwayRepoInstance = Container.get(pathwayRepoClass);
    Container.set("PathwayRepo", pathwayRepoInstance);

    let pathwayServiceClass = require("../src/services/pathwayService").default;
    let pathwayServiceInstance = Container.get(pathwayServiceClass);
    Container.set("PathwayService", pathwayServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("pathway controller unit test (create) using pathwayService stub", async function() {
    // Arrange
    let body = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    let pathwayServiceInstance = Container.get("PathwayService");
    sinon.stub(pathwayServiceInstance, "createPathway").returns(Result.ok<IPathwayDTO>({
        "domainId" : req.body.domainId,
        "buildingSource": req.body.buildingSource,
        "buildingDestination": req.body.buildingDestination,
        "floorSource": req.body.floorSource,
        "floorDestination": req.body.floorDestination,
        "description": req.body.description
      }
    ));

    const ctrl = new PathwayController(pathwayServiceInstance as IPathwayService);

    //Act
    await ctrl.createPathway(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(
      {
        "buildingSource": req.body.buildingSource,
        "buildingDestination": req.body.buildingDestination,
        "floorSource": req.body.floorSource,
        "floorDestination": req.body.floorDestination,
        "description": req.body.description
      }
    ));
  });

  it("pathwayController + pathwayService unit test (create) with buildingRepo, pathwayRepo, floorRepo mocks and pathway stub ", async function() {
    // Arrange
    let body = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    /// TEMPS

    let buildingSource = Building.create({
      code: BuildingCode.create("124").getValue(),
      designation: req.body.buildingSource,
      description: "Building 1",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("123")).getValue();


    let buildingDestination = Building.create({
      code: BuildingCode.create("125").getValue(),
      designation: req.body.buildingDestination,
      description: "Building 2",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("125")).getValue();

    let floorSource = Floor.create({
      floorNr: req.body.floorSource,
      building: buildingSource,
      description: "Floor 1"
    }, new UniqueEntityID("123")).getValue();

    let floorDestination = Floor.create({
      floorNr: req.body.floorDestination,
      building: buildingDestination,
      description: "Floor 2"
    }, new UniqueEntityID("124")).getValue();


    /////

    sinon.stub(Pathway, "create").returns(Result.ok({
        "buildingSource": buildingSource,
        "buildingDestination": buildingDestination,
        "floorSource": floorSource,
        "floorDestination": floorDestination,
        "description": req.body.description
      },
    ));

    let buildingRepoInstance = Container.get("BuildingRepo");
    const buildingMock = sandbox.mock(buildingRepoInstance, "findByDesignation");
    buildingMock.expects("findByDesignation").once().returns(new Promise(resolve => resolve(buildingSource)))
      .twice().returns(new Promise(resolve => resolve(buildingDestination)));

    let pathwayRepoInstance = Container.get("PathwayRepo");
    sinon.stub(pathwayRepoInstance, "existsPathwayBetweenFloors").returns(new Promise(resolve => resolve(false)));

    sinon.stub(pathwayRepoInstance, "save").returns(new Promise<Pathway>((resolve, reject) => {
      resolve(Pathway.create({
        "buildingSource":  buildingSource,

        "buildingDestination": buildingDestination,

        "floorSource": floorSource,

        "floorDestination": floorDestination,

        "description": req.body.description
      }, new UniqueEntityID("129")).getValue())
    }));


    let floorRepoInstance = Container.get("FloorRepo");
    const floorMock = sandbox.mock(floorRepoInstance, "findByBuildingIdAndFloorNr");
    floorMock.expects("findByBuildingIdAndFloorNr").once().returns(new Promise(resolve => resolve(floorSource)))
      .twice().returns(new Promise(resolve => resolve(floorDestination)));

    let pathwayServiceInstance = Container.get("PathwayService");

    const ctrl = new PathwayController(pathwayServiceInstance as IPathwayService);

    //Act
    await ctrl.createPathway(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(
      {
        "buildingSource": req.body.buildingSource,
        "buildingDestination": req.body.buildingDestination,
        "floorSource": req.body.floorSource,
        "floorDestination": req.body.floorDestination,
        "description": req.body.description
      }
    ));
    buildingMock.verify();
    floorMock.verify();

  });



  it("pathwayController + pathwayService + pathway unit test (create) with buildingRepo, pathwayRepo and floorRepo mocks ", async function() {
    // Arrange
    let body = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    /// TEMPS

    let buildingSource = Building.create({
      code: BuildingCode.create("124").getValue(),
      designation: req.body.buildingSource,
      description: "Building 1",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("123")).getValue();


    let buildingDestination = Building.create({
      code: BuildingCode.create("125").getValue(),
      designation: req.body.buildingDestination,
      description: "Building 2",
      length: 10,
      width: 10,
      height: 6
    }, new UniqueEntityID("125")).getValue();

    let floorSource = Floor.create({
      floorNr: req.body.floorSource,
      building: buildingSource,
      description: "Floor 1"
    }, new UniqueEntityID("123")).getValue();

    let floorDestination = Floor.create({
      floorNr: req.body.floorDestination,
      building: buildingDestination,
      description: "Floor 2"
    }, new UniqueEntityID("124")).getValue();


    /////

    let buildingRepoInstance = Container.get("BuildingRepo");
    const buildingMock = sandbox.mock(buildingRepoInstance, "findByDesignation");
    buildingMock.expects("findByDesignation").once().returns(new Promise(resolve => resolve(buildingSource)))
      .twice().returns(new Promise(resolve => resolve(buildingDestination)));

    let pathwayRepoInstance = Container.get("PathwayRepo");
    sinon.stub(pathwayRepoInstance, "existsPathwayBetweenFloors").returns(new Promise(resolve => resolve(false)));

    sinon.stub(pathwayRepoInstance, "save").returns(new Promise<Pathway>((resolve, reject) => {
      resolve(Pathway.create({
        "buildingSource":  buildingSource,
        "buildingDestination": buildingDestination,
        "floorSource": floorSource,
        "floorDestination": floorDestination,
        "description": req.body.description
      }, new UniqueEntityID("129")).getValue())
    }));


    let floorRepoInstance = Container.get("FloorRepo");
    const floorMock = sandbox.mock(floorRepoInstance, "findByBuildingIdAndFloorNr");
    floorMock.expects("findByBuildingIdAndFloorNr").once().returns(new Promise(resolve => resolve(floorSource)))
      .twice().returns(new Promise(resolve => resolve(floorDestination)));

    let pathwayServiceInstance = Container.get("PathwayService");

    const ctrl = new PathwayController(pathwayServiceInstance as IPathwayService);

    //Act
    await ctrl.createPathway(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match(
      {
        "buildingSource": req.body.buildingSource,
        "buildingDestination": req.body.buildingDestination,
        "floorSource": req.body.floorSource,
        "floorDestination": req.body.floorDestination,
        "description": req.body.description
      }
    ));
    buildingMock.verify();
    floorMock.verify();

  })
});
