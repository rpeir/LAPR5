import mongoose, { Document } from "mongoose";
import { IRobotPersistence } from "../../dataschema/IRobotPersistence";

const Robot = new mongoose.Schema(
  {
    domainId: { type: String , unique: true },
    nickName: { type: String, unique: true },
    tipoRobot: { type: String },
    nrSerie:  { type: String },
    descricao:  { type: String }
  }
);

export default mongoose.model<IRobotPersistence & Document>("Robot",Robot);
