import mongoose from "mongoose";
import tipoTarefaSchema from "./tipoTarefaSchema";
import { ITipoRobotPersistence } from "../../dataschema/ITipoRobotPersistence";

const TipoRobotSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true},
        tipoTarefas: {type: [tipoTarefaSchema]}
    },
    { timestamps: true }
);

export default mongoose.model<ITipoRobotPersistence & mongoose.Document>('TipoRobot',TipoRobotSchema)