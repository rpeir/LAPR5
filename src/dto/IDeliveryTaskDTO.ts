import { ITaskDTO } from "./ITaskDTO";

export interface IDeliveryTaskDTO extends ITaskDTO {
  senderName : string,
  senderContact : string,
  receiverName : string,
  receiverContact : string,
  confirmationCode : string,
}
