import { NextFunction, Request, Response } from "express";
import * as sinon from "sinon";
import { Container } from "typedi";
import { Result } from "../src/core/logic/Result";
import { IFloorDTO } from "../src/dto/IFloorDTO";
import FloorController from "../src/controllers/floorController";
import IFloorService from "../src/services/IServices/IFloorService";
import { BuildingId } from "../src/domain/building/buildingId";
import { Building } from "../src/domain/building/building";
import { BuildingCode } from "../src/domain/building/BuildingCode";
import { UniqueEntityID } from "../src/core/domain/UniqueEntityID";
import { Floor } from "../src/domain/floor/floor";


describe("floor controller", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(50000);

    Container.reset();

    let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let pathwaySchemaInstance = require("../src/persistence/schemas/pathwaySchema").default;
    Container.set("pathwaySchema", pathwaySchemaInstance);

    let floorRepoClass = require("../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoIInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoIInstance);

    let pathwayRepoClass = require("../src/repos/pathwayRepo").default;
    let pathwayRepoInstance = Container.get(pathwayRepoClass);
    Container.set("PathwayRepo", pathwayRepoInstance);

    let floorServiceClass = require("../src/services/floorService").default;
    let floorServiceInstance = Container.get(floorServiceClass);
    Container.set("FloorService", floorServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });


  it("floorController unit test (create) using floorService stub", async function() {
    //Arrange
    let body = {
      "floorNr": 1,
      "building": "desgi2",
      "description": "salas"
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

    let floorServiceInstance = Container.get("FloorService");
    sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok<IFloorDTO>(
      {
        "domainId": "12345",
        "floorNr": req.body.floorNr,
        "building": req.body.building,
        "description": req.body.description
      }
    ));

    const ctrl = new FloorController(floorServiceInstance as IFloorService);

    //Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, sinon.match({
        domainId: "12345",
        floorNr: req.body.floorNr,
        building: req.body.building,
        description: req.body.description
      })
    );

  });

  it("floorController + floorService integration test (create) using buildingRepo and floorRepo stub ", async function()  {
    //Arrange
    let body = {
      "floorNr": 1,
      "building": "desgi2",
      "description": "salas"
    };
    let req: Partial<Request> = {
      body: body
    };
    // @ts-ignore
    req.auth = {user: {role: {name: "campus manager"}}};

    let res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    let next: Partial<NextFunction> = () => {
    };

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, "findByDesignation").returns(new Promise<BuildingId>((resolve, reject) => {
      resolve(Building.create({
        code: BuildingCode.create("CODE3").getValue(),
        designation: req.body.building,
        description: "Building description",
        length: 10,
        width: 10,
        height: 5
      }, new UniqueEntityID("123")).getValue());
    }));

    let createStub = sinon.stub(Floor,"create").returns(Result.ok({
      "domainId": "123",
      id: new UniqueEntityID("123"),
      "floorNr": req.body.floorNr,

      "building": Building.create({
        code: BuildingCode.create("CODE3").getValue(),
        designation: req.body.building,
        description: "Building description",
        length: 10,
        width: 10,
        height: 5
      }, new UniqueEntityID("123")).getValue(),

      "description": req.body.description
    }));

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
      resolve(Floor.create({
        "floorNr": req.body.floorNr,

        "building": Building.create({
          code: BuildingCode.create("CODE3").getValue(),
          designation: req.body.building,
          description: "Building description",
          length: 10,
          width: 10,
          height: 5
        }, new UniqueEntityID("123")).getValue(),

        "description": req.body.description
      }, new UniqueEntityID("123")).getValue());
    }));

    let floorServiceInstance = Container.get("FloorService");
    const ctrl = new FloorController(floorServiceInstance as IFloorService);

    //Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, sinon.match({
        "domainId": "123",
        "floorNr": req.body.floorNr,
        "building": req.body.building,
        "description": req.body.description
      })
    );
  createStub.restore();
  });

  it("floorController + floorService + floor integration test (create) with floorRepo and buildingRepo stubs",async function() {
    //Arrange
    let body = {
      "floorNr": 1,
      "building": "desgi2",
      "description": "salas"
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

    let buildingRepoInstance = Container.get("BuildingRepo");
    sinon.stub(buildingRepoInstance, "findByDesignation").returns(new Promise<BuildingId>((resolve, reject) => {
      resolve(Building.create({
        code: BuildingCode.create("CODE3").getValue(),
        designation: req.body.building,
        description: "Building description",
        length: 10,
        width: 10,
        height: 5
      }, new UniqueEntityID("123")).getValue());
    }));

    let floorRepoInstance = Container.get("FloorRepo");
    sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
      resolve(Floor.create({
        "floorNr": req.body.floorNr,

        "building": Building.create({
          code: BuildingCode.create("CODE3").getValue(),
          designation: req.body.building,
          description: "Building description",
          length: 10,
          width: 10,
          height: 5
        }, new UniqueEntityID("123")).getValue(),

        "description": req.body.description
      }, new UniqueEntityID("123")).getValue());
    }));

    let floorServiceInstance = Container.get("FloorService");
    const ctrl = new FloorController(floorServiceInstance as IFloorService);

    //Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, sinon.match({
        "domainId": "123",
        "building": req.body.building,
        "description": req.body.description,
        "floorNr": req.body.floorNr
      })
    );

  });


  /*
    it("floorController unit test (update) using floorService stub", async function() {
      ///////////////////////
      let updateBody = {
        "domainId": "a7605971-bc36-43a2-96f6-64582017a508",
        "floorNr": "4",
        "description": "labs"
      };


      let updateReq: Partial<Request> = {};
      updateReq.body = updateBody;

      let updateRes: Partial<Response> = {
        json: sinon.spy()
      };

      let updateNext: Partial<NextFunction> = () => {
      };

      let floorServiceInstance = Container.get("FloorService");
      sinon.stub(floorServiceInstance, "updateBuildingFloor").returns(Result.ok<IFloorDTO>({
        "domainId": updateReq.body.domainId,
        "floorNr": updateReq.body.floorNr,
        "building": "Building B",
        "description": updateReq.body.description
      }));

      const ctrl = new FloorController(floorServiceInstance as IFloorService);
      await ctrl.updateBuildingFloor(<Request>updateReq, <Response>updateRes, <NextFunction>updateNext);

      //Assert
      sinon.assert.calledOnce(updateRes.json);
      sinon.assert.calledWith(updateRes.json, sinon.match({
        "domainId": updateReq.body.domainId,
        "floorNr": updateReq.body.floorNr,
        "building": "Building B",
        "description": updateReq.body.description
      }));

    });
  */
});
