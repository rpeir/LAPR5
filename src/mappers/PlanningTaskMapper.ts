import { Mapper } from "../core/infra/Mapper";

export class PlanningTaskMapper extends Mapper<PlanningTaskMapper>{
 static toDTO(planningTask){
   return{
     id : planningTask.id.toString(),
     pickupRoom: planningTask.pickupRoom,
     deliveryRoom: string;
     pickupFloor: string;
     deliveryFloor: string;
   }
 }
}
