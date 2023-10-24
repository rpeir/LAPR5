import { Inject, Service } from "typedi";
import IRobotService from "./IServices/IRobotService";
import { IRobotDTO } from "../dto/IRobotDTO";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IRobotRepo from "./IRepos/IRobotRepo";
import { RobotNickName } from "../domain/robotNickName";
import { RobotDescricao } from "../domain/robotDescricao";
import { RobotNrSerie } from "../domain/robotNrSerie";
import ITipoRobotRepo from "./IRepos/ITipoRobotRepo";
import { TipoRobot } from "../domain/tipoRobot";
import { Robot } from "../domain/robot";
import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
    @Inject(config.repos.tipoRobot.name) private tipoRobotRepo: ITipoRobotRepo
  ) {
  }

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const nickName = await RobotNickName.create(robotDTO.nickName).getValue();
      const descricao = await RobotDescricao.create(robotDTO.descricao).getValue();
      const nrSerie = await RobotNrSerie.create(robotDTO.nrSerie).getValue();
      let tipoRobot;

      const tipoRobotOrError = await this.getTipoRobot(robotDTO.tipoRobot);
      if (tipoRobotOrError.isFailure) {
        return Result.fail<IRobotDTO>(tipoRobotOrError);
      } else {
        tipoRobot = tipoRobotOrError.getValue();
      }

      const robotOrError = Robot.create({
        nickName: nickName,
        tipoRobot: tipoRobot,
        descricao: descricao,
        nrSerie: nrSerie
      });

      if (robotOrError.isFailure){
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

  private async getTipoRobot(tipoRobotName: string) {
    const tipoRobot = await this.tipoRobotRepo.findByName(tipoRobotName);
    if (!!tipoRobot) {
      return Result.ok<TipoRobot>(tipoRobot);
    } else {
      return Result.fail<TipoRobot>("Couldn't find robot with name: " + tipoRobotName);
    }
  }

}
