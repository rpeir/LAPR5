export interface Task {
  id : string,
  description : string,
  type : string,
  userId : string,
  pickupRoomId : string,
  deliveryRoomId : string,
  status : string,
  taskRequestId : string,
}
