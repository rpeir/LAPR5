import { Pathway } from "../../domain/pathway";
import { Repo } from "../../core/infra/Repo";
import { PathwayID } from "../../domain/pathwayID";

export default interface IPathwayRepo extends Repo<Pathway> {
  save(pathway: Pathway): Promise<Pathway>;

  findById(pathwayId: PathwayID | string): Promise<Pathway>;
}
