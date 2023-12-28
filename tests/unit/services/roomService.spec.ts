import { expect } from 'chai';
import sinon from "sinon";
import { Container } from "typedi";
import IRoomDTO from "../../../src/dto/IRoomDTO";
import IRoomRepo from "../../../src/services/IRepos/IRoomRepo";
import IBuildingRepo from "../../../src/services/IRepos/IBuildingRepo";
import IFloorRepo from "../../../src/services/IRepos/IFloorRepo";
import {BuildingCode} from "../../../src/domain/building/BuildingCode";
import {Building} from "../../../src/domain/building/building";
import {Room} from "../../../src/domain/room/room";
import RoomService from "../../../src/services/roomService";

describe('room service', () => {
  const sandbox = sinon.createSandbox();

  var defaultRoomDTO : IRoomDTO;
  var defaultBuildingProps ;

  beforeEach(function() {
    Container.reset();
    this.timeout(5000);

    let roomSchemaInstance = require("../../../src/persistence/schemas/roomSchema").default;
    Container.set("roomSchema", roomSchemaInstance);

    let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let roomRepoClass = require("../../../src/repos/roomRepo").default;
    let roomRepoInstance = Container.get(roomRepoClass);
    Container.set("RoomRepo", roomRepoInstance);

    let floorRepoClass = require("../../../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);


    defaultRoomDTO = {
      name : "Test Room",
      description : "Test Description",
      category : "classroom",
      floor : 1,
      building : "A"
    }

    defaultBuildingProps = {
      code: BuildingCode.create("A").getValue(),
      designation: "A",
      description: "A",
      length: 100,
      width: 100,
      height: 100
    }

  });

  afterEach(function() {
    sandbox.restore();
  });

  it('createRoom unit test with invalid roomCategory with stub repos', async function () {
    defaultRoomDTO.category = "Invalid Room Category";

    let buildingRepoInstance = Container.get("BuildingRepo");
    // @ts-ignore
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      Building.create(defaultBuildingProps).getValue()
    );

    let floorRepoInstance = Container.get("FloorRepo");
    // @ts-ignore
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    // @ts-ignore
    sinon.stub(roomRepoInstance, 'save').returns(
      (room : Room) => room
    );

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    await service.createRoom(defaultRoomDTO).then((result) => {
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal(`Room category "${defaultRoomDTO.category}" does not exist`);
    });

  });

  it('createRoom unit test with invalid building using stub repos', async function () {
    defaultRoomDTO.building = "Invalid";

    let buildingRepoInstance = Container.get("BuildingRepo");
    // @ts-ignore
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      null
    );

    let floorRepoInstance = Container.get("FloorRepo");
    // @ts-ignore
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(false);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    // @ts-ignore
    sinon.stub(roomRepoInstance, 'save').returns(
      null
    );

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    await service.createRoom(defaultRoomDTO).then((result) => {
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal(`Building with code ${defaultRoomDTO.building} does not exist`);
    });

  });

  it('createRoom unit test with building with no floor using stub repos', async function () {
    defaultRoomDTO.floor = 2;

    let buildingRepoInstance = Container.get("BuildingRepo");
    // @ts-ignore
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      Building.create(defaultBuildingProps).getValue()
    );

    let floorRepoInstance = Container.get("FloorRepo");
    // @ts-ignore
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(false);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    // @ts-ignore
    sinon.stub(roomRepoInstance, 'save').returns(
      (room : Room) => room
    );

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    await service.createRoom(defaultRoomDTO).then((result) => {
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal(`Floor ${defaultRoomDTO.floor} on building ${defaultRoomDTO.building} does not exist`);
    });

  });

    it('createRoom unit test with valid room using stub repos', async function () {
        let buildingRepoInstance = Container.get("BuildingRepo");
        // @ts-ignore
        sinon.stub(buildingRepoInstance, 'findByCode').returns(
          Building.create(defaultBuildingProps).getValue()
        );

        let floorRepoInstance = Container.get("FloorRepo");
        // @ts-ignore
        sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
          new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
        );

        let roomRepoInstance = Container.get("RoomRepo");
        // @ts-ignore
        sinon.stub(roomRepoInstance, 'save').returnsArg(0);

        const service = new RoomService(
        roomRepoInstance as IRoomRepo,
        floorRepoInstance as IFloorRepo,
        buildingRepoInstance as IBuildingRepo
        );

        await service.createRoom(defaultRoomDTO).then((result) => {
        expect(result.isSuccess).to.equal(true);
        expect(result.getValue().name).to.equal(defaultRoomDTO.name);
        expect(result.getValue().description).to.equal(defaultRoomDTO.description);
        expect(result.getValue().category).to.equal(defaultRoomDTO.category);
        expect(result.getValue().floor).to.equal(defaultRoomDTO.floor);
        expect(result.getValue().building).to.equal(defaultRoomDTO.building);
        });

    });

  it('createRoom unit test with existing room using stub repos', async function () {
    let buildingRepoInstance = Container.get("BuildingRepo");
    // @ts-ignore
    sinon.stub(buildingRepoInstance, 'findByCode').returns(
      Building.create(defaultBuildingProps).getValue()
    );

    let floorRepoInstance = Container.get("FloorRepo");
    // @ts-ignore
    sinon.stub(floorRepoInstance, 'existsByBuildingAndNumber').returns(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );

    let roomRepoInstance = Container.get("RoomRepo");
    let err = new Error();
    // @ts-ignore
    sinon.stub(roomRepoInstance, 'save').throws(err);

    const service = new RoomService(
      roomRepoInstance as IRoomRepo,
      floorRepoInstance as IFloorRepo,
      buildingRepoInstance as IBuildingRepo
    );

    await service.createRoom(defaultRoomDTO).then((result) => {
      expect(result.isFailure).to.equal(true);
      expect(result.errorValue()).to.equal(err);
    });

  });

});
