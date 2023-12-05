import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private httpClient: HttpClient) { }
    private baseUrl= environment.apiURL + '/api/auth/signup';

    createManager(user: User) {
        return this.httpClient.post<{userDTO:User,token:string}>(`${this.baseUrl}`, user);
    }
    /*
    registerUser(user: User) {
        return this.httpClient.post<User>(`${this.baseUrl}`, user);
    }
     */
}
