import { Path } from "../domain/planning/path";
import { Mapper } from "../core/infra/Mapper";

export class PathMapper extends Mapper<Path> {
  public static toDTO(path: Path) {
    return {
      id: path.id.toString(),
      buildings: path.buildings,
      paths: path.paths
    }
  }
}
