import { Result } from '../../core/logic/Result';
import { IBuildingDTO } from '../../dto/IBuildingDTO';
import { Building } from '../../domain/building';

export default interface IBuildingService {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(body: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  listAllBuilding(): Promise<Result<IBuildingDTO[]>>;
}
