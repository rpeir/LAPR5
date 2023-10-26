import { Mapper } from "../core/infra/Mapper";
import { Robot } from "../domain/robot";
import { IRobotDTO } from "../dto/IRobotDTO";
import { RobotNickName } from "../domain/robotNickName";
import { RobotSerialNr } from "../domain/robotSerialNr";
import { RobotDescription } from "../domain/robotDescription";
import { Container } from "typedi";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import RobotTypeRepo from "../repos/robotTypeRepo";
import { RobotCode } from "../domain/robotCode";

export class RobotMap extends  Mapper<Robot>{
  public static toDTO(robot: Robot){
    return {
      robotCode: robot.robotCode.value,
      nickName: robot.nickName.value,
      robotType: robot.robotType.id.toString(),
      serialNr: robot.serialNr.value,
      description: robot.description.value
    } as IRobotDTO;
  }

  public static async toDomain(raw: any) {
    const serialNr = RobotSerialNr.create(raw.serialNr);
    const nickName = RobotNickName.create(raw.nickName);
    const description = RobotDescription.create(raw.description);
    const robotCode = RobotCode.create(raw.robotCode);
    const repo  = Container.get(RobotTypeRepo);
    const robotType = await repo.findById(raw.robotType);


    const robotOrError = Robot.create({
      robotCode: robotCode.getValue(),
      nickName: nickName.getValue(),
      serialNr: serialNr.getValue(),
      description: description.getValue(),
      robotType: robotType
    },new UniqueEntityID(raw.domainId))

    robotOrError.isFailure ? console.log(robotOrError.error) : "";

    return robotOrError.isSuccess? robotOrError.getValue(): null;
  }

  public static  toPersistence (robot: Robot){
    const  raw = {
      domainId: robot.id.toString(),
      robotCode: robot.robotCode.value,
      nickName: robot.nickName.value,
      serialNr: robot.serialNr.value,
      description: robot.description.value,
      robotType: robot.robotType.id.toValue()
    }
    return raw;
  }
}
