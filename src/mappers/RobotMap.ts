import { Mapper } from "../core/infra/Mapper";
import { Robot } from "../domain/robot";
import { IRobotDTO } from "../dto/IRobotDTO";
import { RobotNickName } from "../domain/robotNickName";
import { RobotNrSerie } from "../domain/robotNrSerie";
import { RobotDescricao } from "../domain/robotDescricao";
import { Container } from "typedi";
import TipoRobotRepo from "../repos/tipoRobotRepo";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RobotMap extends  Mapper<Robot>{
  public static toDTO(robot: Robot){
    return {
      nickName: robot.nickName.value,
      tipoRobot: robot.tipoRobot.id.toString(),
      nrSerie: robot.nrSerie.value,
      descricao: robot.descricao.value
    } as IRobotDTO;
  }

  public static async toDomain(raw: any) {
    const nrSerie = RobotNrSerie.create(raw.nrSerie);
    const nickName = RobotNickName.create(raw.nickName);
    const descricao = RobotDescricao.create(raw.descricao);
    const repo = Container.get(TipoRobotRepo);
    const tipoRobot = await repo.findByName(raw.name);

    const robotOrError = Robot.create({
      nickName: nickName.getValue(),
      nrSerie: nrSerie.getValue(),
      descricao: descricao.getValue(),
      tipoRobot: tipoRobot
    },new UniqueEntityID(raw.domainId))

    robotOrError.isFailure ? console.log(robotOrError.error) : "";

    return robotOrError.isSuccess? robotOrError.getValue(): null;
  }

  public static  toPersistence (robot: Robot){
    const  raw = {
      domainId: robot.id.toString(),
      nickName: robot.nickName.value,
      nrSerie: robot.nrSerie.value,
      descricao: robot.descricao.value,
      tipoRobot: robot.tipoRobot.id.toValue()
    }
    return raw;
  }
}
