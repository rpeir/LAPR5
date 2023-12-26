import { Robot } from "../../angular-app/src/app/robot/robot";

export interface ITaskDTO {
  id : string,
  type : string,
  userId : string,
  pickupRoomId : string,
  deliveryRoomId : string,
  status : string,
  taskRequestId : string,
  description: string,
  robot: string;
  senderName?: string;
  receiverName?: string;
  senderContact?: string;
  receiverContact?: string;
  confirmationCode?: string;
  EmergencyNumber?: string;
  floorId?: number;
}
