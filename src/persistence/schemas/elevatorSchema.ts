import mongoose from "mongoose";
import {IElevatorPersistence} from "../../dataschema/IElevatorPersistence";

const ElevatorSchema = new mongoose.Schema({
  domainId: {type:String, unique:true},
  code: {type: String},
  designation: {type: String},
  buildingDesignation: {type: String},
  floorsServed: {type: [String]},
},
{timestamps:true}
);
ElevatorSchema.index({code:1, buildingDesignation:1}, {unique:true});

export default mongoose.model<IElevatorPersistence & mongoose.Document>("Elevator",ElevatorSchema);
