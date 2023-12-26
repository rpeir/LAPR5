import { IFloorDTO } from '../../dto/IFloorDTO';
import { Result } from '../../core/logic/Result';
import { IBuildingDTO } from '../../dto/IBuildingDTO';
import { Floor } from "../../domain/floor/floor";

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  getFloorsOfBuilding(buildingDesignation: string): Promise<Result<IFloorDTO[]>>;

  getBuildingFloorMaxMin(max: number, min: number): Promise<Result<IBuildingDTO[]>>;

  updateBuildingFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  uploadFloorMap(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;

  listFloorsWithPathways(buildingDesignation: string): Promise<Result<Map<number, IFloorDTO[]>>>;
  findByBuildingIdAndFloorNr(buildingId: string, floorNr: number): Promise<Result<IFloorDTO>>;
  getFloorById(id: string): Promise<Result<IFloorDTO>>;
}
