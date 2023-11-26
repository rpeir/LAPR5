import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import { BuildingId } from '../../../src/domain/building/buildingId';
import { Building } from '../../../src/domain/building/building';
import { BuildingCode } from '../../../src/domain/building/BuildingCode';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Floor } from '../../../src/domain/floor/floor';
import { Result } from '../../../src/core/logic/Result';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import FloorService from '../../../src/services/floorService';
import IPathwayRepo from '../../../src/services/IRepos/IPathwayRepo';
import { IFloorDTO } from '../../../src/dto/IFloorDTO';
import { Pathway } from '../../../src/domain/pathway/pathway';
import PathwayService from '../../../src/services/pathwayService';
import { IPathwayDTO } from '../../../src/dto/IPathwayDTO';

describe('floor service', function() {
  const sandbox = sinon.createSandbox();
  beforeEach(function() {
    Container.reset();
    this.timeout(50000);

    const floorSchemaInstance = require('../../../src/persistence/schemas/floorSchema').default;
    Container.set('floorSchema', floorSchemaInstance);

    const buildingSchemaInstance = require('../../../src/persistence/schemas/buildingSchema').default;
    Container.set('buildingSchema', buildingSchemaInstance);

    const pathwaySchemaInstance = require('../../../src/persistence/schemas/pathwaySchema').default;
    Container.set('pathwaySchema', pathwaySchemaInstance);

    const floorRepoClass = require('../../../src/repos/floorRepo').default;
    const floorRepoInstance = Container.get(floorRepoClass);
    Container.set('FloorRepo', floorRepoInstance);

    const buildingRepoClass = require('../../../src/repos/buildingRepo').default;
    const buildingRepoIInstance = Container.get(buildingRepoClass);
    Container.set('BuildingRepo', buildingRepoIInstance);

    const pathwayRepoClass = require('../../../src/repos/pathwayRepo').default;
    const pathwayRepoInstance = Container.get(pathwayRepoClass);
    Container.set('PathwayRepo', pathwayRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('floorService unit test (create) using buildingRepo, floor and floorRepo stub ', async function() {
    //Arrange
    const floorDTO = {
      floorNr: 1,
      building: 'desgi2',
      description: 'salas',
    };

    const buildingRepoInstance = Container.get('BuildingRepo');
    sinon.stub(buildingRepoInstance, 'findByDesignation').returns(
      new Promise<BuildingId>((resolve, reject) => {
        resolve(
          Building.create(
            {
              code: BuildingCode.create('CODE3').getValue(),
              designation: floorDTO.building,
              description: 'Building description',
              length: 10,
              width: 10,
              height: 5,
            },
            new UniqueEntityID('123'),
          ).getValue(),
        );
      }),
    );

    const createStub = sinon.stub(Floor, 'create').returns(
      Result.ok({
        domainId: '123',
        floorNr: floorDTO.floorNr,
        id: new UniqueEntityID('123'),
        building: Building.create(
          {
            code: BuildingCode.create('CODE3').getValue(),
            designation: floorDTO.building,
            description: 'Building description',
            length: 10,
            width: 10,
            height: 5,
          },
          new UniqueEntityID('123'),
        ).getValue(),

        description: floorDTO.description,
      }),
    );

    const floorRepoInstance = Container.get('FloorRepo');
    sinon.stub(floorRepoInstance, 'save').returns(
      new Promise<Floor>((resolve, reject) => {
        resolve(
          Floor.create(
            {
              floorNr: floorDTO.floorNr,

              building: Building.create(
                {
                  code: BuildingCode.create('CODE3').getValue(),
                  designation: floorDTO.building,
                  description: 'Building description',
                  length: 10,
                  width: 10,
                  height: 5,
                },
                new UniqueEntityID('123'),
              ).getValue(),

              description: floorDTO.description,
            },
            new UniqueEntityID('123'),
          ).getValue(),
        );
      }),
    );

    const pathwayRepoInstance = Container.get('PathwayRepo');

    const floorService = new FloorService(
      buildingRepoInstance as IBuildingRepo,
      floorRepoInstance as IFloorRepo,
      pathwayRepoInstance as IPathwayRepo,
    );

    await floorService.createFloor(floorDTO as IFloorDTO).then(result => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        domainId: '123',
        floorNr: floorDTO.floorNr,
        building: floorDTO.building,
        description: floorDTO.description,
      });
    });

    createStub.restore();
  });

  it('floorService + floor integration  test (create) using buildingRepo and floorRepo stub ', async function() {
    //Arrange
    const floorDTO = {
      floorNr: 1,
      building: 'desgi2',
      description: 'salas',
    };

    const buildingRepoInstance = Container.get('BuildingRepo');
    sinon.stub(buildingRepoInstance, 'findByDesignation').returns(
      new Promise<BuildingId>((resolve, reject) => {
        resolve(
          Building.create(
            {
              code: BuildingCode.create('CODE3').getValue(),
              designation: floorDTO.building,
              description: 'Building description',
              length: 10,
              width: 10,
              height: 5,
            },
            new UniqueEntityID('123'),
          ).getValue(),
        );
      }),
    );

    const floorRepoInstance = Container.get('FloorRepo');
    sinon.stub(floorRepoInstance, 'save').returns(
      new Promise<BuildingId>((resolve, reject) => {
        resolve(
          Floor.create(
            {
              floorNr: floorDTO.floorNr,

              building: Building.create(
                {
                  code: BuildingCode.create('CODE3').getValue(),
                  designation: floorDTO.building,
                  description: 'Building description',
                  length: 10,
                  width: 10,
                  height: 5,
                },
                new UniqueEntityID('123'),
              ).getValue(),

              description: floorDTO.description,
            },
            new UniqueEntityID('123'),
          ).getValue(),
        );
      }),
    );

    const buildingRepo = Container.get('BuildingRepo');
    const floorRepo = Container.get('FloorRepo');
    const pathwayRepo = Container.get('PathwayRepo');

    const floorService = new FloorService(
      buildingRepo as IBuildingRepo,
      floorRepo as IFloorRepo,
      pathwayRepo as IPathwayRepo,
    );

    await floorService.createFloor(floorDTO as IFloorDTO).then(result => {
      expect(result.isFailure).to.equal(false);
      expect(result.getValue()).to.deep.equal({
        domainId: '123',
        floorNr: floorDTO.floorNr,
        building: floorDTO.building,
        description: floorDTO.description,
      });
    });
  });
});
