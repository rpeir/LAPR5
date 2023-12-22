import { Task } from "./task";

export interface DeliveryTask extends Task {
  senderName : string,
  senderContact : string,
  receiverName : string,
  receiverContact : string,
  confirmationCode : string,
}
