import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/room/room";

export default interface IRoomRepo extends Repo<Room> {
findByBuildingAndFloor(code: string, floor: number) ;
}
