import mongoose from "mongoose";
import {IElevatorPersistence} from "../../dataschema/IElevatorPersistence";

const ElevatorSchema = new mongoose.Schema({
  domainId: {type:String, unique:true},
  code: {type: Number},
  designation: {type: String},
  buildingDesignation: {type: String},
  floorsServed: {type: [String]},
      brand: {type: String},
    modelE: {type: String},
    serialNumber: {type: String},
      description: {type: String},
},
{timestamps:true}
);
ElevatorSchema.index({code:1, buildingDesignation:1}, {unique:true});
ElevatorSchema.index({buildingDesignation:1,designation:1}, {unique:true});

export default mongoose.model<IElevatorPersistence & mongoose.Document>("Elevator",ElevatorSchema);
