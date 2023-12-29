import { Container, Inject, Service } from "typedi";

import config from "../../config";
import ITaskService from "./IServices/ITaskService";
import { ITaskDTO } from "../dto/ITaskDTO";
import { ITaskRequestDTO } from "../dto/ITaskRequestDTO";
import ITaskAdapter from "../adapters/IAdapters/ITaskAdapter";
import { TaskMapper } from "../mappers/TaskMapper";
import RoomRepo from "../repos/roomRepo";
import { TaskType } from "../domain/taskType/taskType";
import { ISurveillanceTaskRequestDTO } from "../dto/ISurveillanceTaskRequestDTO";
import FloorRepo from "../repos/floorRepo";
import BuildingRepo from "../repos/buildingRepo";
import { IDeliveryTaskRequestDTO } from "../dto/IDeliveryTaskRequestDTO";
import { TaskRequest } from "../../angular-app/src/app/task/taskRequest";


@Service()
export default class TaskService implements ITaskService {
  constructor(
    @Inject(config.adapters.taskAdapter.name) private taskAdapter: ITaskAdapter) {
  }

  public async approveTask(requestId: string, robotId: string): Promise<ITaskDTO> {
    const task = await this.taskAdapter.approveTask(requestId, robotId);
    return TaskMapper.toDTO(task);
  }

  public async rejectTask(requestId: string): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.rejectTask(requestId);
  }

  public async getAll(): Promise<ITaskDTO[]> {
    const tasks = await this.taskAdapter.findAll();
    return tasks.map((task) => TaskMapper.toDTO(task));
  }

  public async getById(id: string): Promise<ITaskDTO> {
    const task = await this.taskAdapter.findById(id);
    return TaskMapper.toDTO(task);
  }

  public async getTaskRequests(params: [string, string][]): Promise<ITaskRequestDTO[]> {
    return await this.taskAdapter.findTaskRequests(params);
  }

  public async getTaskRequestById(id: string): Promise<ITaskRequestDTO> {
    return await this.taskAdapter.findTaskRequestById(id);
  }

  public async createTaskRequest(taskRequestDTO: ITaskRequestDTO): Promise<ITaskRequestDTO> {

    const roomRepo = Container.get(RoomRepo);
    const pickupRoom = await roomRepo.findByName(taskRequestDTO.pickupRoomId);
    const deliveryRoom = await roomRepo.findByName(taskRequestDTO.deliveryRoomId);



    let newTaskRequestDTO;

    if (taskRequestDTO.type == TaskType.surveillance) {
      const floorRepo = Container.get(FloorRepo);
      const buildingRepo = Container.get(BuildingRepo);
      const building = await buildingRepo.findByCode(pickupRoom.building.value);
      const floor = await floorRepo.findByBuildingAndNumber(building.id.toString(), pickupRoom.floor);
      const surveillanceTaskDT0 = taskRequestDTO as ISurveillanceTaskRequestDTO;
      const emergencyNumber = surveillanceTaskDT0.emergencyNumber ? surveillanceTaskDT0.emergencyNumber : undefined;
      const floorId = floor.id;

      newTaskRequestDTO = {
        description: taskRequestDTO.description,
        type: taskRequestDTO.type,
        userId: taskRequestDTO.userId,
        pickupRoomId: pickupRoom.id.toString(),
        deliveryRoomId: deliveryRoom.id.toString(),
        emergencyNumber : emergencyNumber,
        floorId : floorId.toString(),
      } as ITaskRequestDTO;

    }

    if (taskRequestDTO.type == TaskType.delivery) {
      const deliveryTaskDTO = taskRequestDTO as IDeliveryTaskRequestDTO;
      const senderName = deliveryTaskDTO.senderName ? deliveryTaskDTO.senderName : undefined;
      const receiverName = deliveryTaskDTO.receiverName ? deliveryTaskDTO.receiverName : undefined;
      const senderContact = deliveryTaskDTO.senderContact ? deliveryTaskDTO.senderContact : undefined;
      const receiverContact = deliveryTaskDTO.receiverContact ? deliveryTaskDTO.receiverContact : undefined;
      const confirmationCode = deliveryTaskDTO.confirmationCode ? deliveryTaskDTO.confirmationCode : undefined;

      newTaskRequestDTO = {
        description: taskRequestDTO.description,
        type: taskRequestDTO.type,
        userId: taskRequestDTO.userId,
        pickupRoomId: pickupRoom.id.toString(),
        deliveryRoomId: deliveryRoom.id.toString(),
        senderName : senderName,
        senderContact : senderContact,
        receiverName : receiverName,
        receiverContact : receiverContact,
        confirmationCode : confirmationCode,
      } as ITaskRequestDTO;
    }


    return await this.taskAdapter.createTaskRequest(newTaskRequestDTO);
  }

  public async getPendingTasks(): Promise<ITaskDTO[]> {
    const tasks = await this.taskAdapter.findPendingTasks();
    return tasks.map((task) => TaskMapper.toDTO(task));
  }

}
