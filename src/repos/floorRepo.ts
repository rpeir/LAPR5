import { Inject, Service } from "typedi";
import { Floor } from "../domain/floor";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import { Model } from "mongoose";
import { Document } from "mongodb";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { FloorMap } from "../mappers/FloorMap";
import { FloorId } from "../domain/floorId";

@Service()
export default class FloorRepo implements IFloorRepo {
  constructor(
    @Inject("floorSchema") private floorSchema: Model<IFloorPersistence & Document>
  ) {
  }

  public async findByBuildingIdAndFloorNr(buildingId: string, floorNr: number): Promise<Floor> {
    const query = { building: buildingId, floorNr: floorNr };
    const floorRecord = await this.floorSchema.findOne(query);
      return FloorMap.toDomain(floorRecord);

  }

  private createBaseQuery(): any {
    return {
      where: {}
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
      return FloorMap.toDomain(floorRecord);
    } else {
      return null;
    }
  }

  public async save(floor: Floor): Promise<Floor> {
    const query = { domainId: floor.id.toString() };
    const floorDocument = await this.floorSchema.findOne(query);

    try {
      if (floorDocument === null) {
        const rawFloor = FloorMap.toPersistence(floor);
        const floorCreated = await this.floorSchema.create(rawFloor);
        return FloorMap.toDomain(floorCreated);
      } else {
        floorDocument.building = floor.building;
        floorDocument.floorNr = floor.floorNr;
        floorDocument.description = floor.description;
        await floorDocument.save();
        return floor;
      }
    } catch (err) {
      throw err;
    }
  }
}





