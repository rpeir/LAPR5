import { Inject, Service } from 'typedi';
import { Floor } from '../domain/floor/floor';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Model } from 'mongoose';
import { Document } from 'mongodb';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { FloorMapper } from '../mappers/FloorMapper';
import { FloorId } from '../domain/floor/floorId';
import { BuildingId } from '../domain/building/buildingId';
import { Pathway } from '../domain/pathway/pathway';

@Service()
export default class FloorRepo implements IFloorRepo {
  constructor(@Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>) {}

  public async findByBuildingIdAndFloorNr(buildingId: string, floorNr: number): Promise<Floor> {
    const query = { building: buildingId, floorNr: floorNr };
    const floorRecord = await this.floorSchema.findOne(query);
    if (floorRecord != null) {
      return FloorMapper.toDomain(floorRecord);
    } else {
      return null;
    }
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(floorId: FloorId | string): Promise<boolean> {
    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;

    const query = { domainId: idX };
    const floorRecord = await this.floorSchema.findOne(query);

    return !!floorRecord === true;
  }

  public async findById(floorId: FloorId | string): Promise<Floor> {
    const idX = floorId instanceof FloorId ? (<FloorId>floorId).id.toValue() : floorId;

    const query = { domainId: idX };
    const floorRecord = await this.floorSchema.findOne(query);
    if (floorRecord != null) {
      return FloorMapper.toDomain(floorRecord);
    } else {
      return null;
    }
  }

  public async save(floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString() };
    const floorDocument = await this.floorSchema.findOne(query);

    try {
      if (floorDocument === null) {
        const rawFloor = FloorMapper.toPersistence(floor);
        const floorCreated = await this.floorSchema.create(rawFloor);
        return FloorMapper.toDomain(floorCreated);
      } else {
        floorDocument.floorNr = floor.floorNr;
        floorDocument.description = floor.description;
        await floorDocument.save();
        return floor;
      }
    } catch (err) {
      throw err;
    }
  }
  public async findByBuildingAndNumber(building: string | number, number: number): Promise<Floor> {
    const query = { building: building, floorNr: number };
    const floorRecord = await this.floorSchema.findOne(query);
    if (floorRecord != null) {
      return FloorMapper.toDomain(floorRecord);
    } else {
      return null;
    }
  }

  public async findByBuildingId(buildingId: BuildingId | string): Promise<Floor[]> {
    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).id.toValue() : buildingId;

    const query = { building: idX };
    const floorRecords = await this.floorSchema.find(query);

    if (floorRecords.length !== 0) {
      return await Promise.all(floorRecords.map(floorRecord => FloorMapper.toDomain(floorRecord)));
    } else {
      return [];
    }
  }

  public async findBuildingByFloorMaxMin(max: number, min: number) {
    const records = await this.floorSchema.aggregate([
      {
        $group: {
          _id: '$building',
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gte: min, $lte: max },
        },
      },
    ]);

    const buildingsId = records.map(record => record._id);
    return buildingsId;
  }

  public async existsByBuildingAndNumber(building: string | number, number: number): Promise<boolean> {
    const query = { building: building, floorNr: number };
    const floorRecord = await this.floorSchema.findOne(query);

    return !!floorRecord === true;
  }

  public async updateOne(floor: Floor): Promise<Floor> {
    const floorDocument = await this.floorSchema.updateOne(
      { domainId: floor.id },
      {
        building: floor.building.id.toString(),
        description: floor.description,
        floorNr: floor.floorNr,
        floorMap: floor.floorMap,
      },
    );
    await floorDocument;
    return floor;
  }
  public async updateOneWithFloorMap(floor: Floor): Promise<Floor> {
    const floorDocument = await this.floorSchema.updateOne(
      { domainId: floor.id },
      {
        floorMap: floor.floorMap.props,
      },
    );
    await floorDocument;
    return floor;
  }
  public async floorsInPathway(pathways: Pathway[]): Promise<Floor[]> {
    const floors: Floor[] = [];
    for (const pathway of pathways) {
      let floor = await this.findById(pathway.floorSource);
      if (floor != null) floors.push(floor);
      floor = await this.findById(pathway.floorDestination);
      if (floor != null) floors.push(floor);
    }
    return floors;
  }
}
