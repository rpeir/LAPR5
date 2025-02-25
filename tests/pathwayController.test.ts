import { NextFunction, Request, Response } from "express";
import sinon from "sinon";
import { Container } from "typedi";
import { Result } from "../src/core/logic/Result";
import { IPathwayDTO } from "../src/dto/IPathwayDTO";
import PathwayController from "../src/controllers/pathwayController";
import IPathwayService from "../src/services/IServices/IPathwayService";
import { BuildingCode } from "../src/domain/building/BuildingCode";
import { Pathway } from "../src/domain/pathway/pathway";
import { Building } from "../src/domain/building/building";
import { UniqueEntityID } from "../src/core/domain/UniqueEntityID";
import { Floor } from "../src/domain/floor/floor";

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
      "id": "123",
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "campus manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    let next: Partial<NextFunction> = () => {
    };

    let pathwayServiceInstance = Container.get("PathwayService");
    // @ts-ignore
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
    // @ts-ignore
    sinon.assert.calledOnce(res.json);
    // @ts-ignore
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

  it("pathwayController + pathwayService integration test (create) with buildingRepo, pathwayRepo, floorRepo mocks and pathway stub ", async function() {
    // Arrange
    let body = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "campus manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
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

    // @ts-ignore
    let createdStub = sinon.stub(Pathway, "create").returns(Result.ok({
        "id" : new UniqueEntityID("129"),
        "buildingSource": buildingSource,
        "buildingDestination": buildingDestination,
        "floorSource": floorSource,
        "floorDestination": floorDestination,
        "description": req.body.description
      },
    ));

    let buildingRepoInstance = Container.get("BuildingRepo");
    // @ts-ignore
    const buildingMock = sandbox.stub(buildingRepoInstance, "findByDesignation");
    buildingMock.onCall(0).returns(new Promise(resolve => resolve(buildingSource)))
      .onCall(1).returns(new Promise(resolve => resolve(buildingDestination)));

    let pathwayRepoInstance = Container.get("PathwayRepo");
    // @ts-ignore
    sinon.stub(pathwayRepoInstance, "existsPathwayBetweenFloors").returns(new Promise(resolve => resolve(false)));

    // @ts-ignore
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
    // @ts-ignore
    const floorMock = sandbox.stub(floorRepoInstance, "findByBuildingIdAndFloorNr");
    floorMock.onCall(0).returns(new Promise(resolve => resolve(floorSource)))
      .onCall(1).returns(new Promise(resolve => resolve(floorDestination)));

    let pathwayServiceInstance = Container.get("PathwayService");

    const ctrl = new PathwayController(pathwayServiceInstance as IPathwayService);

    //Act
    await ctrl.createPathway(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    // @ts-ignore
    sinon.assert.calledWith(res.status, 201);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match(
      {
        "domainId" : "129",
        "buildingSource": req.body.buildingSource,
        "buildingDestination": req.body.buildingDestination,
        "floorSource": req.body.floorSource,
        "floorDestination": req.body.floorDestination,
        "description": req.body.description
      }
    ));

    createdStub.restore();
  });



  it("pathwayController + pathwayService + pathway integration test (create) with buildingRepo, pathwayRepo and floorRepo mocks ", async function() {
    // Arrange
    let body = {
      "buildingSource": "B103",
      "buildingDestination": "B123",
      "floorSource": 1,
      "floorDestination": 1,
      "description": "pathway B103-B123"
    };

    let req: Partial<Request> = {};
    // @ts-ignore
    req.auth = {user: {role: {name: "campus manager"}}};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
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
    // @ts-ignore
    const buildingMock = sandbox.stub(buildingRepoInstance, "findByDesignation");
    buildingMock.onCall(0).returns(new Promise(resolve => resolve(buildingSource)))
      .onCall(1).returns(new Promise(resolve => resolve(buildingDestination)));

    let pathwayRepoInstance = Container.get("PathwayRepo");
    // @ts-ignore
    sinon.stub(pathwayRepoInstance, "existsPathwayBetweenFloors").returns(new Promise(resolve => resolve(false)));

    // @ts-ignore
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
    // @ts-ignore
    const floorMock = sandbox.stub(floorRepoInstance, "findByBuildingIdAndFloorNr");
    floorMock.onCall(0).returns(new Promise(resolve => resolve(floorSource)))
      .onCall(1).returns(new Promise(resolve => resolve(floorDestination)));

    let pathwayServiceInstance = Container.get("PathwayService");

    const ctrl = new PathwayController(pathwayServiceInstance as IPathwayService);

    //Act
    await ctrl.createPathway(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    // @ts-ignore
    sinon.assert.calledWith(res.status, 201);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match(
      {
        "domainId" : "129",
        "buildingSource": req.body.buildingSource,
        "buildingDestination": req.body.buildingDestination,
        "floorSource": req.body.floorSource,
        "floorDestination": req.body.floorDestination,
        "description": req.body.description
      }
    ));

  });

  // it("pathway controller unit test (list) using pathwayService stub", async function() {
  //   // Arrange
  //   let req: Partial<Request> = {};
  //
  //   let res: Partial<Response> = {
  //     json: sinon.spy()
  //   };
  //
  //   let next: Partial<NextFunction> = () => {
  //   };
  //
  //
  //   let pathwayServiceInstance = Container.get("PathwayService");
  //   sinon.stub(pathwayServiceInstance, "listPathways").returns(Result.ok<IPathwayDTO[]>([{
  //       "domainId" : "123",
  //       "buildingSource": "B103",
  //       "buildingDestination": "B123",
  //       "floorSource": 1,
  //       "floorDestination": 1,
  //       "description": "pathway B103-B123"
  //     },
  //     {
  //       "domainId" : "124",
  //       "buildingSource": "B103",
  //       "buildingDestination": "B123",
  //       "floorSource": 1,
  //       "floorDestination": 1,
  //       "description": "pathway B103-B123"
  //     }])
  //   );
  //
  //   const ctrl = new PathwayController(pathwayServiceInstance as IPathwayService);
  //
  //   //Act
  //   await ctrl.listPathways(<Request>req, <Response>res, <NextFunction>next);
  //
  //   //Assert
  //   sinon.assert.calledOnce(res.json);
  //   sinon.assert.calledWith(res.json, sinon.match(
  //     [
  //       {
  //         "buildingSource": "B103",
  //         "buildingDestination": "B123",
  //         "floorSource": 1,
  //         "floorDestination": 1,
  //         "description": "pathway B103-B123"
  //       },
  //       {
  //         "buildingSource": "B103",
  //         "buildingDestination": "B123",
  //         "floorSource": 1,
  //         "floorDestination": 1,
  //         "description": "pathway B103-B123"
  //       }
  //     ]
  //   ));
  // });
});
