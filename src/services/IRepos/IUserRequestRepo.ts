import {UserRequest} from "../../domain/user/userRequest";
import {Repo} from "../../core/infra/Repo";

export default interface IUserRequestRepo extends Repo<UserRequest>{
    save(req:UserRequest):Promise<UserRequest>;
}
