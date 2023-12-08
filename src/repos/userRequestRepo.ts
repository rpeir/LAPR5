import {Inject, Service} from "typedi";
import IUserRequestRepo from "../services/IRepos/IUserRequestRepo";
import {Document, Model} from "mongoose";
import {IUserPersistence} from "../dataschema/IUserPersistence";
import {UserId} from "../domain/user/userId";
import {User} from "../domain/user/user";
import {UserMap} from "../mappers/UserMap";
import {UserRequest} from "../domain/user/userRequest";
import {UserRequestMap} from "../mappers/UserRequestMap";
import {IUserRequestPersistence} from "../dataschema/IUserRequestPersistence";

@Service()

export default class UserRequestRepo implements IUserRequestRepo{
    private models:any;

    constructor(
        @Inject('userRequestSchema') private userSchema : Model<IUserRequestPersistence & Document>,
        @Inject('logger') private logger
    ) { }

    private createBaseQuery (): any {
        return {
            where: {},
        }
    }public async save (req: UserRequest): Promise<UserRequest> {
        const query = { domainId: req.id.toString() };

        const userDocument = await this.userSchema.findOne( query );

        try {
            if (userDocument === null ) {
                const rawUser: any = UserRequestMap.toPersistence(req);

                const userCreated = await this.userSchema.create(rawUser);

                return UserRequestMap.toDomain(userCreated);
            } else {
                userDocument.firstName = req.firstName;
                userDocument.lastName = req.lastName;
                await userDocument.save();

                return req;
            }
        } catch (err) {
            throw err;
        }
    }

  exists(t: UserRequest): Promise<boolean> {
    return Promise.resolve(false);
  }
}
