import { Inject, Service } from "typedi";
import { Pathway } from "../domain/pathway";
import { PathwayID } from "../domain/pathwayID";
import IPathwayRepo from "../services/IRepos/IPathwayRepo";
import { Document, MongoServerError } from "mongodb";
import { IPathwayPersistence } from "../dataschema/IPathwayPersistence";
import { Model } from "mongoose";
import { PathwayMap } from "../mappers/PathwayMap";
import { Floor } from "../domain/floor";

@Service()
export default class PathwayRepo implements IPathwayRepo {

  constructor(
    @Inject("pathwaySchema") private pathwaySchema: Model<IPathwayPersistence & Document>
  ) {
  }

  public async save(pathway: Pathway): Promise<Pathway> {
    const query = {domainId: pathway.id.toString()};
    const pathwayDocument = await this.pathwaySchema.findOne(query);
    try {
      if (pathwayDocument === null) {
        const rawPathway = PathwayMap.toPersistence(pathway);
        const pathwayCreated = await this.pathwaySchema.create(rawPathway);
        return PathwayMap.toDomain(pathwayCreated);
      } else {
        pathwayDocument.buildingSource = pathway.buildingSource;
        pathwayDocument.buildingDestiny = pathway.buildingDestination;
        pathwayDocument.floorSource = pathway.floorSource;
        pathwayDocument.floorDestiny = pathway.floorDestination;
        pathwayDocument.description = pathway.description;
        await pathwayDocument.save();
        return pathway;
      }
    } catch (err) {
      if (err instanceof MongoServerError) {
        if (err.code == 11000) {
          throw `Already exists pathway with ${JSON.stringify(err.keyPattern)}`;
        }
      }
      throw err;
    }
  }

  public async findById(pathwayId: string | PathwayID): Promise<Pathway> {
    const idX = pathwayId instanceof PathwayID ? (<PathwayID>pathwayId).id.toValue() : pathwayId;
    const query = {domainId: idX};
    const pathwayRecord = await this.pathwaySchema.findOne(query);
    if (pathwayRecord != null) {
      return PathwayMap.toDomain(pathwayRecord);
    } else {
      return null;
    }
  }

  public async exists(pathwayId: string | PathwayID): Promise<boolean> {
    const idX = pathwayId instanceof PathwayID ? (<PathwayID>pathwayId).id.toValue() : pathwayId;
    const query = {domainId: idX};
    const pathwayRecord = await this.pathwaySchema.findOne(query);
    return !!pathwayRecord === true;
  }

  public async findAll(source:string,dest:string):Promise<Pathway[]>{
    const query = {buildingSource:source,buildingDestination:dest};
    const pathwayRecord = await this.pathwaySchema.find(query);
    if (pathwayRecord != null) {
      return Promise.all(pathwayRecord.map((pathway) => PathwayMap.toDomain(pathway)));
    } else {
      return null;
    }
  }

  public async existsPathwayBetweenFloors(floor1 : Floor, floor2 : Floor) : Promise<boolean> {
    let query = {
      floorSource:floor1.id.toString(),
      floorDestination:floor2.id.toString(),
      buildingSource:floor1.building.id.toString(),
      buildingDestination:floor2.building.id.toString()
    };
    let pathwayRecord = await this.pathwaySchema.findOne(query);
    if (pathwayRecord != null) return true;

    query = {
      floorSource:floor2.id.toString(),
      floorDestination:floor1.id.toString(),
      buildingSource:floor2.building.id.toString(),
      buildingDestination:floor1.building.id.toString()
    };
    pathwayRecord = await this.pathwaySchema.findOne(query);
    return pathwayRecord != null;
  }
}