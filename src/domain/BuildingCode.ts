import { ValueObject } from '../core/domain/ValueObject';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';

interface BuildingCodeProps {
  value: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
  get value(): string {
    return this.props.value;
  }
  private constructor(props: BuildingCodeProps) {
    super(props);
  }
  public static create(buildingCode: string): Result<BuildingCode> {
    const guardNull = Guard.againstNullOrUndefined(buildingCode, 'buildingCode');
    const guardLength = Guard.inRange(buildingCode.length, 1, 5, 'buildingCode');
    const guardResult = Guard.combine([guardLength, guardNull]);
    if (!guardResult.succeeded) {
      return Result.fail<BuildingCode>(guardResult.message);
    } else {
      return Result.ok<BuildingCode>(new BuildingCode({ value: buildingCode }));
    }
  }
}
