import {Inject, Service} from "typedi";
import IUserRequestService from "./IServices/IUserRequestService";
import config from "../../config";
import IUserRequestRepo from "./IRepos/IUserRequestRepo";
import {Result} from "../core/logic/Result";
import {IUserRequestDTO} from "../dto/IUserRequestDTO";
import {UserRequestMap} from "../mappers/UserRequestMap";
import {IElevatorDTO} from "../dto/IElevatorDTO";
import {IUserDTO} from "../dto/IUserDTO";
import IUserRepo from "./IRepos/IUserRepo";
import {UserMap} from "../mappers/UserMap";
import {Role} from "../domain/role/role";
import IRoleRepo from "./IRepos/IRoleRepo";

@Service()

export default class UserRequestService implements IUserRequestService{
  constructor(
    @Inject(config.repos.userRequest.name) private reqRepo:IUserRequestRepo,
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
    @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
  ) {
  }
  public async listAllRequests(): Promise<Result<IUserRequestDTO[]>>{
    try{
      const listOrError=await this.reqRepo.listReq();
      const listResult=listOrError.map((req)=>UserRequestMap.toDTO(req));
      if (listResult.length === 0) {
        return Result.fail<IUserRequestDTO[]>("No requests found");
      }

      return Result.ok<IUserRequestDTO[]>(listResult);
    } catch (err) {
      // Handle errors here if needed.
      throw Result.fail<IElevatorDTO>(err);
    }
  }
  public async registerUser(user: IUserRequestDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>{
    try{
      const register=await this.reqRepo.getReqById(user.id);
      if(register==null){
        return Result.fail<{userDTO: IUserDTO, token: string}>("Request not found");
      }
      const role= await this.roleRepo.findByName("user");
      const userOrError=register.accept(role);
      if(userOrError.isFailure){
        return Result.fail<{userDTO: IUserDTO, token: string}>(userOrError.errorValue());
      }
      const userResult=userOrError.getValue();
      const savedUser=await this.userRepo.save(userResult);
      // convert user to DTO
      const userDTO = UserMap.toDTO(savedUser);
      // remove the request from db
      await this.reqRepo.deleteReq(user.id);
      // return the user
      return Result.ok<{userDTO: IUserDTO, token: string}>({userDTO, token: ""});
    }catch (err) {
      // Handle errors here if needed.
      throw Result.fail<IUserRequestDTO>(err);
    }
  }
  public async declineUser(id:string){
    try{
      await this.reqRepo.deleteReq(id);
    }catch (err){
      throw Result.fail(err);
    }
  }
}
