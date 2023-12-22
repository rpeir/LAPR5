import { TaskRequest } from "./taskRequest";

export interface DeliveryTaskRequest extends TaskRequest {
  senderName : string,
  senderContact : string,
  receiverName : string,
  receiverContact : string,
  confirmationCode : string,
}
