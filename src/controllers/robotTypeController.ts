import { Inject, Service } from "typedi";
import IRobotTypeController from "./IControllers/IRobotTypeController";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import config from "../../config";
import IRobotTypeService from "../services/IServices/IRobotTypeService";
import { IRobotType } from "../dto/IRobotType";
import { Result } from "../core/logic/Result";

@Service()
export default class RobotTypeController implements IRobotTypeController{
constructor(
    @Inject(config.services.robotType.name) private robotTypeService: IRobotTypeService
    ){}


    public async createRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const robotTypeOrError = await this.robotTypeService.createRobotType(req.body as IRobotType) as Result<IRobotType>;

            if (robotTypeOrError.isFailure) {
                return res.status(402).send(robotTypeOrError.error);
            }

            const robotTypeDTO = robotTypeOrError.getValue();
            return res.json( robotTypeDTO).status(201);
        } catch (error) {
            return next(error);
        }
    }

}
