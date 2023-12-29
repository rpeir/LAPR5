import {NextFunction, Request, Response} from "express";
import {Container} from "typedi";
import sinon from "sinon";
import {Result} from "../src/core/logic/Result";
import {IBuildingDTO} from "../src/dto/IBuildingDTO";
import BuildingController from "../src/controllers/buildingController";
import IBuildingService from "../src/services/IServices/IBuildingService";
import {Building} from "../src/domain/building/building";

describe("building controller", function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    Container.reset();
    this.timeout(50000);
    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);

    let buildingServiceClass = require("../src/services/buildingService").default;
    let buildingServiceInstance = Container.get(buildingServiceClass);
    Container.set("BuildingService", buildingServiceInstance);

  });

  afterEach(function () {
    sandbox.restore();
  });
  it("buildingController unit test (create) using buildingService stub", async function () {
    // Arrange

    let body = {
      "id": "201",
      "code": "201",
      "designation": "BUG A",
      "description": "bc",
      "length": 100,
      "width": 100,
      "height": 50,
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


    let buildingServiceInstance = Container.get("BuildingService");
    // @ts-ignore
    sinon.stub(buildingServiceInstance, "createBuilding").returns(Result.ok<IBuildingDTO>({
      "domainId": req.body.id,
      "code": req.body.code,
      "designation": req.body.designation,
      "description": req.body.description,
      "length": req.body.length,
      "width": req.body.width,
      "height": req.body.height,
    }));
    const ctrl = new BuildingController((buildingServiceInstance as IBuildingService));
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);
    // @ts-ignore
    sinon.assert.calledOnce(res.status);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match({
      "code": req.body.code,
      "designation": req.body.designation,
      "description": req.body.description,
      "length": req.body.length,
      "width": req.body.width,
      "height": req.body.height,
    }));
  });
  it("buildingController + buildingService integration test (create) with buildingRepo stub", async function () {
    // Arrange

    let body = {
      "code": "201",
      "designation": "BUG A",
      "description": "bc",
      "length": 100,
      "width": 100,
      "height": 50,
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
    // @ts-ignore
    sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
      resolve(Building.create({
        code: req.body.code,
        designation: req.body.designation,
        description: req.body.description,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
      }).getValue());
      }));
    let buildingServiceInstance = Container.get("BuildingService");
    const ctrl = new BuildingController((buildingServiceInstance as IBuildingService));
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);
    // @ts-ignore
    sinon.assert.calledOnce(res.json);
    // @ts-ignore
    sinon.assert.calledWith(res.json, sinon.match({
      "code": req.body.code,
      "designation": req.body.designation,
      "description": req.body.description,
      "length": req.body.length,
      "width": req.body.width,
      "height": req.body.height,
    }));
  });
});

