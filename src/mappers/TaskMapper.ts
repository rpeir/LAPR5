import { Mapper } from "../core/infra/Mapper";
import { Task } from "../domain/task/task";
import { ITaskDTO } from "../dto/ITaskDTO";
import UserRepo from "../repos/userRepo";
import { Container } from "typedi";
import RoomRepo from "../repos/roomRepo";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TaskPersistence } from "../persistence/TaskPersistence";
import RobotRepo from "../repos/robotRepo";

export class TaskMapper extends Mapper<Task> {
  public static toDTO(task: Task) {
    const senderName = task.senderName ? task.senderName : undefined;
    const receiverName = task.receiverName ? task.receiverName : undefined;
    const senderContact = task.senderContact ? task.senderContact : undefined;
    const receiverContact = task.receiverContact ? task.receiverContact : undefined;
    const confirmationCode = task.confirmationCode ? task.confirmationCode : undefined;
    const EmergencyNumber = task.emergencyNumber ? task.emergencyNumber : undefined;
    const floorId = task.floorId ? task.floorId : undefined;
    // @ts-ignore
    const robot = task.robot ? task.robot.nickName.value : task.robotId;
    const pickupRoom = task.pickupRoomId.name ? task.pickupRoomId.name : task.pickupRoomId;
    const deliveryRoom = task.deliveryRoomId.name ? task.deliveryRoomId.name : task.deliveryRoomId;
      return {
        id: task.id.toString(),
        type: task.type,
        userId: task.userId.firstName + " " + task.userId.lastName,
        pickupRoomId: pickupRoom,
        deliveryRoomId: deliveryRoom,
        status: task.status,
        identificationCode: task.identificationCode,
        description: task.description,
        robot: robot,
        senderName: senderName,
        receiverName: receiverName,
        senderContact: senderContact,
        receiverContact: receiverContact,
        confirmationCode: confirmationCode,
        emergencyNumber: EmergencyNumber,
        floorId: floorId
      } as ITaskDTO;
  }

  public static async toDomain(raw: any) {
    const userRepo = Container.get(UserRepo);
    const user = await userRepo.findById(raw.userId);

    const roomRepo = Container.get(RoomRepo);
    const pickupRoom = await roomRepo.findById(raw.pickupRoomId);
    const deliveryRoom = await roomRepo.findById(raw.deliveryRoomId);

    const robotRepo = Container.get(RobotRepo);
    const robot = await robotRepo.findById(raw.robotId);
    const senderName = raw.senderName ? raw.senderName : undefined;
    const receiverName = raw.receiverName ? raw.receiverName : undefined;
    const senderContact = raw.senderContact ? raw.senderContact : undefined;
    const receiverContact = raw.receiverContact ? raw.receiverContact : undefined;
    const confirmationCode = raw.confirmationCode ? raw.confirmationCode : undefined;
    const emergencyNumber = raw.emergencyNumber ? raw.emergencyNumber : undefined;
    const floorId = raw.floorId ? raw.floorId : undefined;


    const taskOrError = Task.create(
      {
        type: raw.type,
        user: user,
        pickupRoom: pickupRoom,
        deliveryRoom: deliveryRoom,
        status: raw.status,
        identificationCode: raw.identificationCode,
        description: raw.description,
        robot: robot,
        senderName: senderName,
        receiverName: receiverName,
        senderContact: senderContact,
        receiverContact: receiverContact,
        confirmationCode: confirmationCode,
        emergencyNumber: emergencyNumber,
        floorId: floorId
      },
      raw.id
    );

    taskOrError.isFailure ? console.log(taskOrError.error) : '';

    return taskOrError.isSuccess ? taskOrError.getValue() : null;
  }


  public static toPersistence(task: Task) {
    const senderName = task.senderName ? task.senderName : undefined;
    const receiverName = task.receiverName ? task.receiverName : undefined;
    const senderContact = task.senderContact ? task.senderContact : undefined;
    const receiverContact = task.receiverContact ? task.receiverContact : undefined;
    const confirmationCode = task.confirmationCode ? task.confirmationCode : undefined;
    const EmergencyNumber = task.emergencyNumber ? task.emergencyNumber : undefined;
    const floorId = task.floorId ? task.floorId : undefined;
    return {
      id: task.id.toString(),
      type: task.type,
      userId: task.userId.id.toString(),
      pickupRoomId: task.pickupRoomId.id.toString(),
      deliveryRoomId: task.deliveryRoomId.id.toString(),
      status: task.status,
      identificationCode: task.identificationCode,
      description: task.description,
      robot: task.robot.id.toString(),
      senderName: senderName,
      receiverName: receiverName,
      senderContact: senderContact,
      receiverContact: receiverContact,
      confirmationCode: confirmationCode,
      emergencyNumber: EmergencyNumber,
      floorId: floorId
    } as TaskPersistence;
  }


}
