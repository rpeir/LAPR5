export interface ITaskRequestDTO {
  id : string,
  description : string,
  type : string,
  userId : string,
  pickupRoomId : string,
  deliveryRoomId : string,
  requestStatus : string,
}
