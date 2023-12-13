import {IUserRequestDTO} from "../../dto/IUserRequestDTO";
import {Result} from "../../core/logic/Result";
import {IUserDTO} from "../../dto/IUserDTO";

export default interface IUserRequestService{
  listAllRequests():Promise<Result<IUserRequestDTO[]>>;
  registerUser(user: IUserRequestDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  declineUser(id: string):void;
}
