import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Role} from "./role";

@Injectable({
    providedIn: 'root'
})
export class RoleService{
    constructor(private httpClient:HttpClient) { }
    private baseUrl= environment.apiURL+ '/api/roles';

    listRoles(){
        return this.httpClient.get<Role[]>(`${this.baseUrl}`);
    }
}
