import {IUserRequestDTO} from "../../dto/IUserRequestDTO";
import {Result} from "../../core/logic/Result";
import {IUserDTO} from "../../dto/IUserDTO";

export default interface IUserRequestService{
  listPendingRequests():Promise<Result<IUserRequestDTO[]>>;
  registerUser(user: IUserRequestDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  declineUser(id: string):void;
  deleteUserRequest(id: string):void;
}
