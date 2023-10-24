import { Inject, Service } from "typedi";
import ITipoRobotController from "./IControllers/ITipoRobotController";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import config from "../../config";
import ITipoRobotService from "../services/IServices/ITipoRobotService";
import { ITipoRobotDTO } from "../dto/ITipoRobotDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class TipoRobotController implements ITipoRobotController{
constructor(
    @Inject(config.services.tipoRobot.name) private tipoRobotServiceInstance: ITipoRobotService
    ){}


    public async createTipoRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const tipoRobotOrError = await this.tipoRobotServiceInstance.createTipoRobot(req.body as ITipoRobotDTO) as Result<ITipoRobotDTO>;

            if (tipoRobotOrError.isFailure) {
                return res.status(402).send(tipoRobotOrError.error);
            }

            const tipoRobotDTO = tipoRobotOrError.getValue();
            return res.json( tipoRobotDTO).status(201);
        } catch (error) {
            return next(error);
        }
    }

}
