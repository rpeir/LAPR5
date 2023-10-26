import { IPathwayDTO } from "../../dto/IPathwayDTO";
import { Result } from "../../core/logic/Result";

export default interface IPathwayService {
  createPathway(pathwayDTO: IPathwayDTO): Promise<Result<IPathwayDTO>>;
}
