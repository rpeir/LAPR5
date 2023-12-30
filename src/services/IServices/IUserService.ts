import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";
import {IUserRequestDTO} from "../../dto/IUserRequestDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  userSignUpRequest(userDTO: IUserRequestDTO):Promise<Result<IUserRequestDTO>>;
  updateUser(dto: IUserDTO): Promise<Result<IUserDTO>>;
  deleteUser(id: string): Promise<Result<boolean>>;
}
