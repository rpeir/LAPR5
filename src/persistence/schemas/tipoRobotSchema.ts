import mongoose from "mongoose";
import { ITipoRobotPersistence } from "../../dataschema/ITipoRobotPersistence";

const TipoRobotSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    tipoTarefas: { type: [String] },
    marca: { type: String },
    modelo: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<ITipoRobotPersistence & mongoose.Document>("TipoRobot", TipoRobotSchema);
