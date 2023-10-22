import ITipoRobotRepo from "../services/IRepos/ITipoRobotRepo";
import { TipoRobot } from "../domain/tipoRobot";
import { TipoRobotId } from "../domain/tipoRobotId";
import { Inject, Service } from "typedi";
import { Model } from "mongoose";
import { ITipoRobotPersistence } from "../dataschema/ITipoRobotPersistence";
import { Document } from "mongodb";
import { TipoRobotMap } from "../mappers/TipoRobotMap";

@Service()
export default class TipoRobotRepo implements ITipoRobotRepo {
    private models: any;

    constructor(@Inject('tipoRobotSchema') private tipoRobotSchema : Model<ITipoRobotPersistence & Document>){}

    public async save(tipoRobot: TipoRobot): Promise<TipoRobot> {
        const query = { domainId: tipoRobot.id.toString()};

        const tipoRobotDocument = await this.tipoRobotSchema.findOne(query);

        try{
            if(tipoRobotDocument === null){
                const rawTipoRobot: any = TipoRobotMap.toPersistence(tipoRobot);
                const tipoRobotCreated = await this.tipoRobotSchema.create(rawTipoRobot);
                return TipoRobotMap.toDomain(tipoRobotCreated);
            } else{
                tipoRobotDocument.name = tipoRobot.name;
                tipoRobotDocument.tipoTarefas = tipoRobot.tipoTarefas;
                await tipoRobotDocument.save();
                return tipoRobot;
            }
        } catch(err){
            throw err;
        }
    }

    public async findByName(name: string): Promise<TipoRobot> {
        const query = { name: name};
        const tipoRobotRecord = await this.tipoRobotSchema.findOne(query);

        if (tipoRobotRecord != null) {
            return TipoRobotMap.toDomain(tipoRobotRecord);
        }else{
            return null;
        }

    }

    public async findById(tipoRobotId: TipoRobotId |string): Promise<TipoRobot> {
        const idX = tipoRobotId instanceof TipoRobotId ? (<TipoRobotId> tipoRobotId).id.toValue() : tipoRobotId;
        const query = { domainId: idX}; 
        const tipoRobotRecord = await this.tipoRobotSchema.findOne(query);

        if (tipoRobotRecord != null) {
            return TipoRobotMap.toDomain(tipoRobotRecord);
        }else{
            return null;
        }
    }

    public async exists(tipoRobotId: TipoRobotId): Promise<boolean> {
        const idX = tipoRobotId instanceof TipoRobotId ? (<TipoRobotId> tipoRobotId).id.toValue() : tipoRobotId;
        const query = { domainId: idX}; 
        const tipoRobotDocument = await this.tipoRobotSchema.findOne( query);
        return !!tipoRobotDocument === true; 
    }
    
}