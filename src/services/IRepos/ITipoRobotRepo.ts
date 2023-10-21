import { Repo } from "../../core/infra/Repo";
import { TipoRobot } from "../../domain/tipoRobot";

export default interface ITipoRobotRepo extends Repo<TipoRobot>{
    save(tipoRobot: TipoRobot): Promise<TipoRobot>;
    findByName(name: string): Promise<TipoRobot>;
    findById(id: string): Promise<TipoRobot>;
}