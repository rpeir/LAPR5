import mongoose from "mongoose";
import { IRobotTypePersistence } from "../../dataschema/IRobotTypePersistence";

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    taskTypes: { type: [String] },
    brand: { type: String },
    robotTypeModel: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>("RobotType", RobotTypeSchema);
