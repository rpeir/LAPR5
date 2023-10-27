import { Inject, Service } from 'typedi';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Model } from 'mongoose';
import {Document, MongoServerError} from 'mongodb';
import { Building } from '../domain/building/building';
import { BuildingMap } from '../mappers/BuildingMap';
import { BuildingCode } from '../domain/building/BuildingCode';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { RobotTypeID } from '../domain/robotTypeID';
import { BuildingId } from '../domain/building/buildingId';
import { FloorMap } from '../mappers/FloorMap';
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

@Service()
export default class BuildingRepo implements IBuildingRepo {
  private models: any;

  constructor(@Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }
  public async save(building: Building): Promise<Building> {
    const query = { domainId: building.id.toString() };
    const buildingDocument = await this.buildingSchema.findOne(query);
    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);
        const buildingCreated = await this.buildingSchema.create(rawBuilding);
        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.code = building.code.value;
        buildingDocument.designation = building.designation;
        buildingDocument.description = building.description;
        buildingDocument.length = building.length;
        buildingDocument.width = building.width;
        buildingDocument.height = building.height;
        await buildingDocument.save();
        return building;
      }
    } catch (err) {
      if (err instanceof MongoServerError) {
        if (err.code == 11000) {
          throw `Already exists building with ${JSON.stringify(err.keyValue)}`;
        }
      }
      throw err;
    }
  }
  public async updateOne(building: Building): Promise<Building> {
    const buildingDocument = await this.buildingSchema.updateOne(
      { domainId: building.id },
      {
        designation: building.designation,
        description: building.description,
        length: building.length,
        width: building.width,
        height: building.height,
      },
    );
    await buildingDocument;
    return building;
  }
  public async findByDesignation(designation: string): Promise<Building> {
    const query = { designation: designation };
    const buildingRecord = await this.buildingSchema.findOne(query);
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else {
      return null;
    }
  }
  public async findByCode(buildingCode: BuildingCode | string): Promise<Building | null> {
    //TODO convert buildingCode to string?
    //const idx = buildingCode instanceof BuildingCode ? <BuildingCode>buildingCode : buildingCode;
    const query = { code: buildingCode };
    const buildingRecord = await this.buildingSchema.findOne(query);
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else {
      return null;
    }
  }
  public async exists(building: Building): Promise<boolean> {
    const idx = building instanceof BuildingCode ? <BuildingCode>building : building;
    const query = { buildingCode: idx };
    const buildingDocument = await this.buildingSchema.findOne(query);
    return !!buildingDocument === true;
  }

  public async findById(buildingId: BuildingId | string): Promise<Building> {
    const idx = buildingId instanceof BuildingId ? <BuildingId>buildingId : buildingId;
    const query = { domainId: idx };
    const buildingRecord = await this.buildingSchema.findOne(query);
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else {
      return null;
    }
  }
  public async findAll(): Promise<Building[]> {
    const buildingRecords = await this.buildingSchema.find();
    const buildings = [];
    for (const buildingRecord of buildingRecords) {
      buildings.push(BuildingMap.toDomain(buildingRecord));
    }
    return buildings;
  }
}
