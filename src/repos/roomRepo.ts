import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import IRoomRepo from "../services/IRepos/IRoomRepo";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";
import { Room } from "../domain/room/room";
import { RoomMap } from "../mappers/RoomMap";
import { MongoAPIError, MongoServerError } from "mongodb";

@Service()
export default class RoomRepo implements IRoomRepo {
  private models: any;

  constructor(
    @Inject('roomSchema') private roomSchema: Model<IRoomPersistence & Document>,
  ) {
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
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
}
