import { ITaskRequestDTO } from "./ITaskRequestDTO";

export interface IDeliveryTaskRequestDTO extends ITaskRequestDTO {
  senderName : string,
  senderContact : string,
  receiverName : string,
  receiverContact : string,
  confirmationCode : string,
}
