import { NextFunction, Request, Response } from "express";
import * as sinon from "sinon";
import { Container } from "typedi";
import { Result } from "../src/core/logic/Result";
import { IPathwayDTO } from "../src/dto/IPathwayDTO";
import PathwayController from "../src/controllers/pathwayController";
import IPathwayService from "../src/services/IServices/IPathwayService";

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

});
