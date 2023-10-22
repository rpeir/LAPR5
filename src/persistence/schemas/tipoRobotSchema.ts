import mongoose from "mongoose";
import { TipoTarefaSchema } from "./tipoTarefaSchema";
import { ITipoRobotPersistence } from "../../dataschema/ITipoRobotPersistence";

const TipoRobotSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true},
        tipoTarefas:  [TipoTarefaSchema],
    },
    { timestamps: true }
);

export default mongoose.model<ITipoRobotPersistence & mongoose.Document>('TipoRobot',TipoRobotSchema)