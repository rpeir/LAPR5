import { Service, Inject } from "typedi";

import { Document, Model } from "mongoose";
import IRoomRepo from "../services/IRepos/IRoomRepo";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { Room } from "../domain/room/room";
import { RoomMap } from "../mappers/RoomMap";
import { MongoAPIError, MongoServerError } from "mongodb";
import { RoomId } from "../domain/room/roomId";

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(
    @Inject("roomSchema") private roomSchema: Model<IRoomPersistence & Document>
  ) {
  }

  private createBaseQuery(): any {
    return {
      where: {}
    };
  }

  public async exists(room: Room): Promise<boolean> {

    const idX = room.id.toValue();

    const query = { domainId: idX };
    const userDocument = await this.roomSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(room: Room): Promise<Room> {
    const query = { domainId: room.id.toString() };

    const userDocument = await this.roomSchema.findOne(query);

    try {
      if (userDocument === null) {
        const rawRoom: any = RoomMap.toPersistence(room);

        const createdRoom = await this.roomSchema.create(rawRoom);

        return RoomMap.toDomain(createdRoom);
      } else {
        userDocument.name = room.name;
        userDocument.floor = +room.floor;
        userDocument.description = room.description;
        userDocument.category = room.category;
        userDocument.building = room.building.value;
        await userDocument.save();

        return room;
      }
    } catch (err) {
      if (err instanceof MongoServerError) {
        if (err.code == 11000) {
          throw `Already exists room with ${JSON.stringify(err.keyValue)}`;
        }
      }
      throw err;
    }
  }

  public async findByBuildingAndFloor(code: string, floor: number) {
    const query = { building: code, floor: floor };
    const rooms = await this.roomSchema.find(query);
    if (rooms != null) {
      return rooms.map((room) => RoomMap.toDomain(room));
    } else {
      return null;
    }
  }

  public async findById(roomId: RoomId | string) {
    const idx = roomId instanceof RoomId ? roomId : new RoomId(roomId);
    const query = { domainId: idx };
    const roomRecord = await this.roomSchema.findOne(query);
    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    } else {
      return null;
    }

  }

  public async findByName(roomName: string) {
    const query = { name: roomName };
    const roomRecord = await this.roomSchema.findOne(query);
    if (roomRecord != null) {
      return RoomMap.toDomain(roomRecord);
    } else {
      return null;
    }
  }
}
