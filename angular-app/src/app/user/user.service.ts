import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "./user";
import {UserRequest} from "./UserRequest";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private httpClient: HttpClient) { }
    private baseUrl= environment.apiURL + '/api/auth';

    createManager(user: User) {
        return this.httpClient.post<{userDTO:User,token:string}>(`${this.baseUrl+'/signUp'}`, user);
    }
  createUserRequest(user: UserRequest) {
    return this.httpClient.post<UserRequest>(`${this.baseUrl+'/signUpRequest'}`, user);
  }

}
