import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { Building } from "../building/building";
import { Floor } from "../floor/floor";

interface PlanningPathwayProps {
  buildingSource: string,
  buildingDestination: string,
  floorSource: string,
  floorDestination: string
}

export class PlanningPathway extends AggregateRoot<PlanningPathwayProps> {
  get id(): UniqueEntityID {
    return this._id;
  }


  get buildingSource(): string {
    return this.props.buildingSource;
  }

  get buildingDestination(): string {
    return this.props.buildingDestination;
  }

  get floorSource(): string {
    return this.props.floorSource;
  }

  get floorDestination(): string {
    return this.props.floorDestination;
  }

  private constructor(props: PlanningPathwayProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: PlanningPathwayProps, id?: UniqueEntityID): Result<PlanningPathway> {

    const guardedProps = [
      { argument: props.buildingSource, argumentName: "buildingSource" },
      { argument: props.buildingDestination, argumentName: "buildingDestination" },
      { argument: props.floorSource, argumentName: "floorSource" },
      { argument: props.floorDestination, argumentName: "floorDestination" }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<PlanningPathway>(guardResult.message);
    } else {
      const planningPathway = new PlanningPathway({
        ...props
      }, id);

      return Result.ok<PlanningPathway>(planningPathway);
    }
  }
}
