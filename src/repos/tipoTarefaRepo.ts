import { Inject, Service } from "typedi";
import ITipoTarefaRepo from "../services/IRepos/ITipoTarefaRepo";
import { TipoTarefa } from "../domain/tipoTarefa";
import { TipoTarefaId } from "../domain/tipoTarefaId";
import { Document, FilterQuery, Model } from "mongoose";
import { ITipoTarefaPersistence } from "../dataschema/ITipoTarefaPersistence";
import { TipoTarefaMap } from "../mappers/TipoTarefaMap";

@Service()
export default class TipoTarefaRepo implements ITipoTarefaRepo {
    private models: any;

    constructor(
        @Inject('tipoTarefaSchema') private tipoTarefaSchema: Model<ITipoTarefaPersistence & Document>,
    ) {}

    private createBaseQuery (): any{
        return {
            where: {},
        }
    }

    public async save(tipoTarefa: TipoTarefa): Promise<TipoTarefa> {
        const query = { domainId: tipoTarefa.id.toString()};

        const tipoTarefaDocument = await this.tipoTarefaSchema.findOne(query);

        try{
            if(tipoTarefaDocument === null){
                const rawTipoTarefa: any = TipoTarefaMap.toPersistence(tipoTarefa);

                const tipoTarefaCreated = await this.tipoTarefaSchema.create(rawTipoTarefa);

                return TipoTarefaMap.toDomain(tipoTarefaCreated);
            } else{
                tipoTarefaDocument.name = tipoTarefa.name;
                await tipoTarefaDocument.save();

                return tipoTarefa;
            
            }
        } catch(err){
            throw err;
        }
    }

    public async findByDomainId(tipoTarefaId: string | TipoTarefaId): Promise<TipoTarefa> {
        const query = { domainId: tipoTarefaId};
        const tipoTarefaRecord =  await this.tipoTarefaSchema.findOne( query as FilterQuery<ITipoTarefaPersistence & Document>);

        if (tipoTarefaRecord != null) {
            return TipoTarefaMap.toDomain(tipoTarefaRecord);
        }
        else{
            return null;
        }

    }


    public async exists(tipoTarefa: TipoTarefa): Promise<boolean> {
        const idX = tipoTarefa.id instanceof TipoTarefaId ? (<TipoTarefaId>tipoTarefa.id).toValue(): tipoTarefa.id;

        const query = { domainId: idX}; 
        const tipoTarefaDocument = await this.tipoTarefaSchema.findOne(query as FilterQuery<ITipoTarefaPersistence & Document>);
        
        return !!tipoTarefaDocument === true;
    }
    
}