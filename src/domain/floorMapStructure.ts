import { ValueObject } from '../core/domain/ValueObject';
import { Result } from '../core/logic/Result';
import { Guard } from '../core/logic/Guard';

interface FloorMapProps {
  floor: {
    size: {
      width: number;
      depth: number;
    };
    map: number[][];
    rooms: {
      roomId: string;
      position: number[];
      size: {
        width: number;
        height: number;
      };
    }[];
    exits: [number, number][];
    elevators: [number, number][];
    exitLocation: [number, number];
  };
  ground: {
    size: {
      width: number;
      height: number;
      depth: number;
    };
    segments: {
      width: number;
      height: number;
      depth: number;
    };
    primaryColor: string;
    maps: {
      color: {
        url: string;
      };
      ao: {
        url: string;
        intensity: number;
      };
      displacement: {
        url: string;
        scale: number;
        bias: number;
      };
      normal: {
        url: string;
        _type: number;
        scale: {
          x: number;
          y: number;
        };
      };
      bump: {
        url: string;
        scale: number;
      };
      roughness: {
        url: string;
        rough: number;
      };
    };
    wrapS: number;
    wrapT: number;
    repeat: {
      u: number;
      v: number;
    };
    magFilter: number;
    minFilter: number;
    secondaryColor: string;
  };
  wall: {
    segments: {
      width: number;
      height: number;
    };
    primaryColor: string;
    maps: {
      color: {
        url: string;
      };
      ao: {
        url: string;
        intensity: number;
      };
      displacement: {
        url: string;
        scale: number;
        bias: number;
      };
      normal: {
        url: string;
        _type: number;
        scale: {
          x: number;
          y: number;
        };
      };
      bump: {
        url: string;
        scale: number;
      };
      roughness: {
        url: string;
        rough: number;
      };
    };
    wrapS: number;
    wrapT: number;
    repeat: {
      u: number;
      v: number;
    };
    magFilter: number;
    minFilter: number;
    secondaryColor: string;
  };
}

export class FloorMapStructure extends ValueObject<FloorMapProps> {
  private constructor(props: FloorMapProps) {
    super(props);
  }
  public static create(props: FloorMapProps): Result<FloorMapStructure> {
    const guardedProps = [
      { argument: props.floor, argumentName: 'floor' },
      { argument: props.ground, argumentName: 'ground' },
      { argument: props.wall, argumentName: 'wall' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<FloorMapStructure>(guardResult.message);
    } else {
      const user = new FloorMapStructure({
        ...props,
      });

      return Result.ok<FloorMapStructure>(user);
    }
  }
}
