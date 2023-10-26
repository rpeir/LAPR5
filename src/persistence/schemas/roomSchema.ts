import mongoose, { Document } from "mongoose";
import { IRobotPersistence } from "../../dataschema/IRobotPersistence";

const RoomSchema = new mongoose.Schema(
  {
    domainId : { type: String , unique: true },
    name : { type: String, unique: true },
    description : { type: String },
    category : { type : String },
    floor : { type : String },
    building : {type : String }
  }
);

export default mongoose.model<IRobotPersistence & Document>("Room",RoomSchema);
