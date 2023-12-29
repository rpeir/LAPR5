import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "./user";
import {UserRequest} from "./UserRequest";
import {Observable} from "rxjs";
import {IUserDTO} from "../../../../src/dto/IUserDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private httpClient: HttpClient) { }
  private baseUrl= environment.apiURL + '/api/auth';
  private newUrl=environment.apiURL+ '/api/userRequests'

  createManager(user: User) {
    return this.httpClient.post<{userDTO:User,token:string}>(`${this.baseUrl+'/signUp'}`, user);
  }
  createUserRequest(user: UserRequest) {
    return this.httpClient.post<UserRequest>(`${this.baseUrl+'/signUpRequest'}`, user);
  }
  listPendingRequests(){
    return this.httpClient.get<UserRequest[]>(`${this.newUrl+'/listAllRequests'}`);
  }

  createUser(user: User) {
    return this.httpClient.post<{userDTO:User,token:string}>(`${this.newUrl+'/register-user'}`, user);
  }

  declineUser(id:string) {
    return this.httpClient.delete<UserRequest>(`${this.newUrl+'/decline-user/'+id}`);
  }

  getUserById(userId: string) {
    return this.httpClient.get<User>(this.baseUrl+"/"+userId);
  }

  deleteUser(id: string) {
    return this.httpClient.delete<User>(this.baseUrl+"/"+id);
  }
}
