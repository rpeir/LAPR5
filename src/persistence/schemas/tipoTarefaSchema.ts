import { ITipoTarefaPersistence } from "../../dataschema/ITipoTarefaPersistence";
import mongoose from 'mongoose';

export const TipoTarefaSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true},
        name: { type: String, unique: true}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITipoTarefaPersistence & mongoose.Document>('TipoTarefa', TipoTarefaSchema);