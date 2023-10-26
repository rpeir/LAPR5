import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from "mongoose";

import { Room } from "../domain/room/room";
import IRoomDTO from "../dto/IRoomDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { RoomCategory } from "../domain/room/roomCategory";
import { BuildingCode } from "../domain/BuildingCode";

export class RoomMap extends Mapper<Room> {

  public static toDTO( room : Room ): IRoomDTO {
    return {
      name : room.name,
      description : room.description,
      category : room.category.toString(),
      floor : room.floor,
      building : room.building.value.toString()
    } as IRoomDTO;
  }

  public static toDomain (room: any | Model<IRoomPersistence & Document> ): Room {
    const buildingCode = BuildingCode.create(room.building);
    const roomOrError = Room.create({
        name : room.name,
        description : room.description,
        category : room.category as RoomCategory,
        floor : room.floor,
        building : buildingCode.isSuccess? buildingCode.getValue() : room.building
      }
      ,new UniqueEntityID(room.id)
    );

    roomOrError.isFailure ? console.log(roomOrError.error) : '';

    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence (room: Room): any {
    let building : string;
    if (typeof room.building === 'string'){
      building = room.building;
    } else {
      building = room.building.value.toString();
    }
    return {
      domainId: room.id,
      ...room.props,
      building : building,
    }
  }
}
