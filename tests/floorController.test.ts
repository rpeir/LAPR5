import { NextFunction, Request, Response } from "express";
import * as sinon from "sinon";
import { Container } from "typedi";
import { Result } from "../src/core/logic/Result";
import { IFloorDTO } from "../src/dto/IFloorDTO";
import FloorController from "../src/controllers/floorController";
import IFloorService from "../src/services/IServices/IFloorService";


describe("floor controller", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(50000);

    Container.reset();

    let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let floorRepoClass = require("../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoIInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoIInstance);

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
      "building": "desgi",
      "description": "salas"
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };

    let next: Partial<NextFunction> = () => {
    };

    let floorServiceInstance = Container.get("FloorService");
    sinon.stub(floorServiceInstance, "createFloor").returns(Result.ok<IFloorDTO>(
      {
        "domainId": "123",
        "floorNr": req.body.floor,
        "building": req.body.building,
        "description": req.body.description
      }
    ));

    const ctrl = new FloorController(floorServiceInstance as IFloorService);

    //Act
    await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
        "domainId": "123",
        "floorNr": req.body.floor,
        "building": req.body.building,
        "description": req.body.description
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
