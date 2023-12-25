import { User } from "../user/user";
import { Room } from "../room/room";
import { Floor } from "../floor/floor";

export interface TaskRequest {
  id : string,
  description : string,
  type : string,
  userId : string,
  pickupRoomId : string,
  deliveryRoomId : string,
  requestStatus : string,
  senderName : string,
  receiverName : string,
  senderContact : string,
  receiverContact : string,
  confirmationCode : string,
  emergencyNumber : string,
  floorId : string,
  user : User
  pickupRoom : Room,
  deliveryRoom : Room,
  floor: Floor
}