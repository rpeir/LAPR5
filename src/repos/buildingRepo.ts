import {Inject, Service} from "typedi";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import {Model} from "mongoose";
import { Document } from "mongodb";
import {Building} from "../domain/building";
import {BuildingMap} from "../mappers/BuildingMap";
import {BuildingCode} from "../domain/BuildingCode";
import {IBuildingPersistence} from "../dataschema/IBuildingPersistence";
import { RobotTypeID } from "../domain/robotTypeID";
import { BuildingId } from "../domain/buildingId";
import { FloorMap } from "../mappers/FloorMap";

@Service()
export default class BuildingRepo implements IBuildingRepo{
    private models: any;

    constructor(@Inject('buildingSchema')private buildingSchema : Model<IBuildingPersistence & Document>) {}
  private createBaseQuery(): any {
    return {
      where: {}
    };
  }
    public  async save(building: Building): Promise<Building> {
      const query = {domainId: building.id.toString()};
      const buildingDocument=await this.buildingSchema.findOne(query);
      try{
        if(buildingDocument === null){
          const rawBuilding: any = BuildingMap.toPersistence(building);
          const buildingCreated=await this.buildingSchema.create(rawBuilding);
          return BuildingMap.toDomain(buildingCreated);
        } else{
          buildingDocument.code= building.code.value;
          buildingDocument.designation=building.designation;
          buildingDocument.description=building.description;
          buildingDocument.length=building.length;
          buildingDocument.width=building.width;
          buildingDocument.height=building.height;
          await  buildingDocument.save();
          return building;
        }
      }catch (err){
        throw err;
      }
    }
    public async findByDesignation(designation:string): Promise<Building>{
      const query={designation: designation};
      const buildingRecord = await this.buildingSchema.findOne(query);
      if (buildingRecord != null) {
        return BuildingMap.toDomain(buildingRecord);
      }else{
        return null;
      }
    }
    public async findByCode(): Promise<Building>{
      return null;
    }
   public async exists(building: Building): Promise<boolean>{
      const idx=building instanceof BuildingCode ? (<BuildingCode> building) : building;
      const query = { buildingCode: idx};
      const buildingDocument = await this.buildingSchema.findOne( query);
      return !!buildingDocument === true;
    }

  public async  findById(buildingId: RobotTypeID | string): Promise<Building> {
    const idx=buildingId instanceof BuildingId ? (<BuildingId> buildingId) : buildingId;
    const query = { buildingCode: idx};
    const buildingRecord = await this.buildingSchema.findOne( query);
    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    } else {
      return null;
    }
  }

}
