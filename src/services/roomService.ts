import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import config from "../../config";
import IRoomService from "./IServices/IRoomService";
import IRoomDTO from "../dto/IRoomDTO";
import { RoomCategory } from "../domain/room/roomCategory";
import { Room } from "../domain/room/room";
import IRoomRepo from "./IRepos/IRoomRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import { RoomMap } from "../mappers/RoomMap";
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingService from "./IServices/IBuildingService";
import IFloorService from "./IServices/IFloorService";

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {
  }
  public async getRoomById(roomId: string): Promise<Result<IRoomDTO>> {
    try {
      const room = await this.roomRepo.findById(roomId);
      if (room == null) {
        return Result.fail<IRoomDTO>("Room does not exist");
      }
      const roomDTO = RoomMap.toDTO(room);
      return Result.ok<IRoomDTO>(roomDTO);
    } catch (error) {
      throw error;
    }
  }

  public async getRoomsByBuildingAndFloor(buildingDesignation: string, floor: string): Promise<Result<IRoomDTO[]>> {
    try {
      const building = await this.buildingRepo.findByDesignation(buildingDesignation);
      if (building == null) {
        return Result.fail<IRoomDTO[]>(`Building  does not exist`);
      }

      const rooms = await this.roomRepo.findByBuildingAndFloor(building.code.value, Number(floor));
      if (rooms === null) {
        return Result.fail<IRoomDTO[]>("No rooms found on building: " + buildingDesignation + " and floor: " + floor);
      }
      const roomsDTO = rooms.map((room) => RoomMap.toDTO(room));
      return Result.ok<IRoomDTO[]>(roomsDTO);
    } catch (error) {
      throw error;
    }
  }

  public async createRoom(roomDTO : IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const name = roomDTO.name;
      const description = roomDTO.description;
      const category = roomDTO.category as RoomCategory;
      const floor = roomDTO.floor;

      if (!Object.values(RoomCategory).includes(category)) {
        return Result.fail<IRoomDTO>(`Room category "${category}" does not exist`);
      }

      const building = await this.buildingRepo.findByCode(roomDTO.building);
      if (building == null) {
        return Result.fail<IRoomDTO>(`Building with code ${roomDTO.building} does not exist`);
      }

      const floorExists = await this.floorRepo.existsByBuildingAndNumber(building.id.toValue(), floor);

      if (!floorExists.valueOf()) {
        return Result.fail<IRoomDTO>(`Floor ${floor} on building ${building.designation} does not exist`);
      }

      const roomOrError = Room.create({
        name : name,
        description : description,
        category : category,
        floor : floor,
        building : building.code
      });

      if (roomOrError.isFailure){
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }
      let roomResult = roomOrError.getValue();

      try {
        roomResult = await this.roomRepo.save(roomResult);
      } catch (err) {
        return Result.fail<IRoomDTO>(err);
      }

      const robotDTOResult = RoomMap.toDTO(roomResult);

      return Result.ok<IRoomDTO>(robotDTOResult);
    } catch (err) {
      throw err;
    }
  }

}
