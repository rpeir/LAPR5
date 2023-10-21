import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITipoTarefaPersistence } from "../dataschema/ITipoTarefaPersistence";
import { TipoTarefa } from "../domain/tipoTarefa";
import ITipoTarefaDTO from "../dto/ITipoTarefaDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";



export class TipoTarefaMap extends Mapper<TipoTarefa> {
    public static toDTO(tipoTarefa: TipoTarefa): ITipoTarefaDTO{
        return {
            id: tipoTarefa.id.toString(),
            name: tipoTarefa.name,
        } as ITipoTarefaDTO;
    }
    
    public static toDomain( tipoTarefa: any | Model<ITipoTarefaPersistence & Document>) : TipoTarefa{
        const tipoTarefaOrError = TipoTarefa.create(tipoTarefa, new UniqueEntityID(tipoTarefa.domainId));

        tipoTarefaOrError.isFailure ? console.log(tipoTarefaOrError.error) : '';

        return tipoTarefaOrError.isSuccess ? tipoTarefaOrError.getValue(): null;
    }

    public static toPersistence(tipoTarefa: TipoTarefa): any {
        return {
            domainId: tipoTarefa.id.toString(),
            name: tipoTarefa.name
        }
    }
}