import { Robot } from "../robot/robot";

export class Task {
  id!: string;
  taskDescription!: string;
  type!: string;
  userId!: string;
  status!: string;
  pickupRoomId!: string;
  deliveryRoomId!: string;
  robot!: Robot;
  taskRequestId!: string;
  senderName?: string;
  receiverName?: string;
  senderContact?: string;
  receiverContact?: string;
  confirmationCode?: string;
  EmergencyNumber?: string;
  floorId?: string;
}
