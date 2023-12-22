import { Robot } from "../robot/robot";

export class Task {
  id: string | undefined;
  taskDescription: string | undefined;
  type: string | undefined;
  userId: string | undefined;
  status: string | undefined;
  pickupRoomId: string | undefined;
  deliveryRoomId: string | undefined;
  robot: Robot | undefined;
  taskRequestId: string | undefined;
  senderName: string | undefined;
  receiverName: string | undefined;
  senderContact: string | undefined;
  receiverContact: string | undefined;
  confirmationCode: string | undefined;
  EmergencyNumber: string | undefined;
  floorId: string | undefined;
}
