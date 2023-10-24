import { Inject, Service } from "typedi";
import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Document } from "mongodb";
import { RobotNickName } from "../domain/robotNickName";
import { Robot } from "../domain/robot";
import { Model } from "mongoose";
import { IRobotPersistence } from "../dataschema/IRobotPersistence";
import { RobotId } from "../domain/robotId";
import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject("robotSchema") private robotSchema: Model<IRobotPersistence & Document>
  ) {
  }

  private createBaseQuery(): any {
    return {
      where: {}
    };
  }

  public async findById(robotId: RobotId | string): Promise<Robot> {
    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX };
    const robotRecord = await this.robotSchema.findOne(query);

    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    } else {
      return null;
    }
  }

  public async findByNickName(nickName: RobotNickName): Promise<Robot> {
    const query = { nickName: nickName.value };
    const robotRecord = await this.robotSchema.findOne(query);
    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    } else {
      return null;
    }


  }

  public async save(robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString()};
    const robotDocument = await this.robotSchema.findOne(query);

    try {
      if (robotDocument === null){
        const rawRobot = RobotMap.toPersistence(robot);
        const  robotCreated = await this.robotSchema.create(rawRobot);
        return RobotMap.toDomain(robotCreated);
      }else {
        robotDocument.nickName = robot.nickName;
        console.log(robot.nickName);
        robotDocument.tipoRobot = robot.tipoRobot;
        robotDocument.nrSerie = robot.nrSerie;
        robotDocument.descricao = robot.descricao;
        await robotDocument.save();
        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async exists(robotId: Robot): Promise<boolean> {
    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = { domainId: idX };
    const robotRecord = await this.robotSchema.findOne(query);

    return !!robotRecord === true;
  }

}
