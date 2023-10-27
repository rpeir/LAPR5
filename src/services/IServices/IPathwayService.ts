import { IPathwayDTO } from "../../dto/IPathwayDTO";
import { Result } from "../../core/logic/Result";

export default interface IPathwayService {
  createPathway(pathwayDTO: IPathwayDTO): Promise<Result<IPathwayDTO>>;
  listPathways(source:string,dest:string): Promise<Result<Array<IPathwayDTO>>>;
}
