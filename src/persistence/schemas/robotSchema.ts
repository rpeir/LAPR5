import mongoose, { Document } from "mongoose";
import { IRobotPersistence } from "../../dataschema/IRobotPersistence";

const Robot = new mongoose.Schema(
  {
    domainId: { type: String , unique: true },
    nickName: { type: String, unique: true },
    robotType: { type: String },
    serialNr:  { type: String },
    description:  { type: String }
  }
);

export default mongoose.model<IRobotPersistence & Document>("Robot",Robot);
