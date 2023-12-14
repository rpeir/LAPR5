import {UserRequest} from "../../domain/user/userRequest";
import {Repo} from "../../core/infra/Repo";
import {UserEmail} from "../../domain/user/userEmail";

export default interface IUserRequestRepo extends Repo<UserRequest>{
    save(req:UserRequest):Promise<UserRequest>;
    findByEmail(email: UserEmail): Promise<UserRequest>;
    listReqPend(): Promise<UserRequest[]>;
    getReqById(id: string): Promise<UserRequest>;
    deleteReq(id: string):void;
}
