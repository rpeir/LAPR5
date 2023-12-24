import { Robot } from "../robot/robot";

export class Task {
  id: string | undefined;
  description: string | undefined;
  type: string | undefined;
  userId: string | undefined;
  status: string | undefined;
  pickupRoomId: string | undefined;
  deliveryRoomId: string | undefined;
  robot: string | undefined;
  taskRequestId: string | undefined;
  senderName: string | undefined;
  receiverName: string | undefined;
  senderContact: string | undefined;
  receiverContact: string | undefined;
  confirmationCode: string | undefined;
  emergencyNumber: string | undefined;
  floorId: string | undefined;
}
