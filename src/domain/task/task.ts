
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { User } from "../user/user";
import { Room } from "../room/room";
import { Guard } from "../../core/logic/Guard";
import { Robot } from "../robot/robot";

interface TaskProps {
  type : string,
  user : User,
  pickupRoom : Room,
  deliveryRoom : Room,
  status : string,
  identificationCode : string,
  description: string,
  robot: Robot;
  senderName?: string;
  receiverName?: string;
  senderContact?: string;
  receiverContact?: string;
  confirmationCode?: string;
  emergencyNumber?: string;
  floorId?: number;
}

export class Task extends AggregateRoot<TaskProps>{
  get id(): UniqueEntityID {
    return this._id;
  }

  get type(): string {
    return this.props.type;
  }

  get userId(): User {
    return this.props.user;
  }

  get pickupRoomId(): Room {
    return this.props.pickupRoom;
  }

  get deliveryRoomId(): Room {
    return this.props.deliveryRoom;
  }

  get status(): string {
    return this.props.status;
  }

  get identificationCode(): string {
    return this.props.identificationCode;
  }

  get description(): string {
    return this.props.description;
  }

  get robot(): Robot {
    return this.props.robot;
  }

  get senderName(): string | undefined {
    return this.props.senderName;
  }

  get receiverName(): string | undefined {
    return this.props.receiverName;
  }

  get senderContact(): string | undefined {
    return this.props.senderContact;
  }

  get receiverContact(): string | undefined {
    return this.props.receiverContact;
  }

  get confirmationCode(): string | undefined {
    return this.props.confirmationCode;
  }

  get emergencyNumber(): string | undefined {
    return this.props.emergencyNumber;
  }

  get floorId(): number | undefined {
    return this.props.floorId;
  }

  private constructor(props: TaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TaskProps, id?: UniqueEntityID): Result<Task> {
      const guardedProps = [
        { argument: props.type, argumentName: 'type' },
        { argument: props.user, argumentName: 'userId' },
        { argument: props.pickupRoom, argumentName: 'pickupRoomId' },
        { argument: props.deliveryRoom, argumentName: 'deliveryRoomId' },
        { argument: props.status, argumentName: 'status' },
        { argument: props.identificationCode, argumentName: 'identificationCode' },
        { argument: props.description, argumentName: 'description' },
        { argument: props.robot, argumentName: 'robot' },
      ];

      const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

      if (!guardResult.succeeded) {
        return Result.fail<Task>(guardResult.message);
      } else {
        const task = new Task(
          {
            ...props,
          },
          id,
        );

        return Result.ok<Task>(task);
      }
  }


}
