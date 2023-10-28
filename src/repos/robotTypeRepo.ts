import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType";
import { RobotTypeID } from "../domain/robotTypeID";
import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { IRobotTypePersistence } from "../dataschema/IRobotTypePersistence";
import { Document } from "mongodb";
import { RobotTypeMap } from "../mappers/RobotTypeMap";

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
    private models: any;

    constructor(@Inject('robotTypeSchema') private robotTypeSchema : Model<IRobotTypePersistence & Document>){}

    public async save(robotType: RobotType): Promise<RobotType> {
        const query = { domainId: robotType.id.toString()};

        const robotTypeDocument = await this.robotTypeSchema.findOne(query);

        try{
            if(robotTypeDocument === null){
                const rawRobotType: any = RobotTypeMap.toPersistence(robotType);
                const createdRobotType = await this.robotTypeSchema.create(rawRobotType);
                return RobotTypeMap.toDomain(createdRobotType);
            } else{
                robotTypeDocument.name = robotType.name;
                robotTypeDocument.taskTypes = robotType.taskTypes;
                robotTypeDocument.robotTypeModel = robotType.robotTypeModel;
                robotTypeDocument.brand = robotType.brand;
                await robotTypeDocument.save();
                return robotType;
            }
        } catch(err){
            throw err;
        }
    }

    public async findByName(name: string): Promise<RobotType> {
        const query = { name: name};
        const robotTypeRecord = await this.robotTypeSchema.findOne(query);

        if (robotTypeRecord != null) {
            return RobotTypeMap.toDomain(robotTypeRecord);
        }else{
            return null;
        }

    }

    public async findById(robotTypeID: RobotTypeID |string): Promise<RobotType> {
        const idX = robotTypeID instanceof RobotTypeID ? (<RobotTypeID> robotTypeID).id.toValue() : robotTypeID;
        const query = { domainId: idX};
        const robotTypeRecord = await this.robotTypeSchema.findOne(query);

        if (robotTypeRecord != null) {
            return RobotTypeMap.toDomain(robotTypeRecord);
        }else{
            return null;
        }
    }

    public async exists(robotTypeID: RobotTypeID): Promise<boolean> {
        const idX = robotTypeID instanceof RobotTypeID ? (<RobotTypeID> robotTypeID).id.toValue() : robotTypeID;
        const query = { domainId: idX};
        const robotTypeDocument = await this.robotTypeSchema.findOne( query);
        return !!robotTypeDocument === true;
    }

}