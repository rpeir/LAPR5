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
import {UserEmail} from "../domain/user/userEmail";
import {RobotMap} from "../mappers/RobotMap";

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
    }
    public async save (req: UserRequest): Promise<UserRequest> {
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
                userDocument.email = req.email.value;
                userDocument.phoneNumber = req.phoneNumber.value;
                userDocument.password = req.password.value;
                userDocument.nif = req.nif;
                userDocument.state = req.state.state;
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
  public async findByEmail(email: UserEmail): Promise<UserRequest> {
    const query = { email: email.toString() };

    const userDocument = await this.userSchema.findOne( query );

    if (userDocument != null) {
      return UserRequestMap.toDomain(userDocument);
    }

    return null;
  }
  public async listReqPend():Promise<UserRequest[]>{
      const query={state:"pending"};
      const reqRecord=await this.userSchema.find(query);
    if (reqRecord != null) {
      return Promise.all(reqRecord.map((req) => UserRequestMap.toDomain(req)));
    } else {
      return null;
    }
  }
  public async getReqById(id: string): Promise<UserRequest> {
    const query = {domainId: id};
    return this.userSchema.findOne(query).then((reqRecord) => {
      if (reqRecord != null) {
        return Promise.resolve(UserRequestMap.toDomain(reqRecord));
      } else {
        return null;
      }
    });
  }
  public async deleteReq(id: string){
      const query={domainId:id};
      await this.userSchema.deleteOne(query);
  }
}
