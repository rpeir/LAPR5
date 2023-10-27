import { Inject, Service } from 'typedi';
import IRobotRepo from '../services/IRepos/IRobotRepo';
import { Document } from 'mongodb';
import { RobotNickName } from '../domain/robotNickName';
import { Robot } from '../domain/robot';
import { Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';
import { RobotId } from '../domain/robotId';
import { RobotMap } from '../mappers/RobotMap';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(@Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>) {
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async updateOne(robot: Robot): Promise<Robot> {
    const robotDocument = await this.robotSchema.updateOne(
      {domainId: robot.id},
      {
        state: robot.state,
      },
    );
    await robotDocument;
    return robot;
  }

  public async findById(robotId: RobotId | string): Promise<Robot> {
    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = {domainId: idX};
    const robotRecord = await this.robotSchema.findOne(query);

    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    } else {
      return null;
    }
  }

  public async findByRobotCode(robotCode: string): Promise<Robot> {
    const query = {robotCode: robotCode};
    const robotRecord = await this.robotSchema.findOne(query);
    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    } else {
      return null;
    }
  }

  public async findByNickName(nickName: RobotNickName | string): Promise<Robot | null> {
    const query = {nickName: nickName instanceof RobotNickName ? nickName.value : nickName};
    const robotRecord = await this.robotSchema.findOne(query);
    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    } else {
      return null;
    }
  }

  public async save(robot: Robot): Promise<Robot> {
    const query = {domainId: robot.id.toString()};
    const robotDocument = await this.robotSchema.findOne(query);

    try {
      if (robotDocument === null) {
        const rawRobot = RobotMap.toPersistence(robot);
        const robotCreated = await this.robotSchema.create(rawRobot);
        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.nickName = robot.nickName;
        robotDocument.robotCode = robot.robotCode;
        robotDocument.robotType = robot.robotType;
        robotDocument.serialNr = robot.serialNr;
        robotDocument.description = robot.description;
        robotDocument.state = robot.state;
        await robotDocument.save();
        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async exists(robotId: Robot): Promise<boolean> {
    const idX = robotId instanceof RobotId ? (<RobotId>robotId).id.toValue() : robotId;

    const query = {domainId: idX};
    const robotRecord = await this.robotSchema.findOne(query);

    return !!robotRecord === true;
  }

  public async findAll(): Promise<Robot[]> {
    const query = {};
    const robotRecord = await this.robotSchema.find(query);
    if (robotRecord != null) {
      return Promise.all(robotRecord.map((robot) => RobotMap.toDomain(robot)));
    } else {
      return null;
    }
  }
}
