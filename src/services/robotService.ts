import { Inject, Service } from "typedi";
import IRobotService from "./IServices/IRobotService";
import { IRobotDTO } from "../dto/IRobotDTO";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IRobotRepo from "./IRepos/IRobotRepo";
import { RobotNickName } from "../domain/robotNickName";
import { RobotDescription } from "../domain/robotDescription";
import { RobotSerialNr } from "../domain/robotSerialNr";
import IRobotTypeRepo from "./IRepos/IRobotTypeRepo";
import { RobotType } from "../domain/robotType";
import { Robot } from "../domain/robot";
import { RobotMap } from "../mappers/RobotMap";
import { RobotCode } from "../domain/robotCode";

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
    @Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo
  ) {
  }

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const nickName = await RobotNickName.create(robotDTO.nickName).getValue();
      const description = await RobotDescription.create(robotDTO.description).getValue();
      const serialNr = await RobotSerialNr.create(robotDTO.serialNr).getValue();
      const robotCode = await RobotCode.create(robotDTO.robotCode).getValue();
      let robotType;

      const robotTypeOrError = await this.getRobotTypeName(robotDTO.robotType);
      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotDTO>(robotTypeOrError);
      } else {
        robotType = robotTypeOrError.getValue();
      }

      const robotOrError = Robot.create({
        nickName: nickName,
        robotType: robotType,
        description: description,
        serialNr: serialNr,
        robotCode: robotCode
      });

      if (robotOrError.isFailure) {
        throw Result.fail<IRobotDTO>(robotOrError.errorValue());
      }
      const robotResult = robotOrError.getValue();
      await this.robotRepo.save(robotResult);
      const robotDTOResult = RobotMap.toDTO(robotResult) as IRobotDTO;
      return Result.ok<IRobotDTO>(robotDTOResult);
    } catch (err) {
      throw err;
    }
  }

  private async getRobotTypeName(robotTypeName: string) {
    const robotType = await this.robotTypeRepo.findByName(robotTypeName);
    if (!!robotType) {
      return Result.ok<RobotType>(robotType);
    } else {
      return Result.fail<RobotType>("Couldn't find robot with name: " + robotTypeName);
    }
  }

}
