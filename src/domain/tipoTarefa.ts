import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TipoTarefaId } from "./tipoTarefaId";

import ITipoTarefaDTO  from "../dto/ITipoTarefaDTO";

interface TipoTarefaProps {
    name: string;
}

export class TipoTarefa extends AggregateRoot<TipoTarefaProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get tipoTarefaId (): TipoTarefaId {
        return new TipoTarefaId(this.tipoTarefaId.toValue());
    }

    get name (): string {
        return this.props.name;
    }
    
    set name ( value: string) {
        this.props.name = value;
    }

    private constructor (props: TipoTarefaProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (tipoTarefaDTO: ITipoTarefaDTO, id?: UniqueEntityID): Result<TipoTarefa> {
        const name = tipoTarefaDTO.name;

        if(!!name === false || name.length === 0){
            return Result.fail<TipoTarefa>('Nome de tarefa necessario')
        } else {
            const tipoTarefa = new TipoTarefa({name: name}, id);
            return Result.ok<TipoTarefa>(tipoTarefa)
        }
    }
}