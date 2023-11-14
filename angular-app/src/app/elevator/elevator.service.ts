import {Injectable} from "@angular/core";
import {Elevator} from "./elevator";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ElevatorService {

        constructor(private httpClient: HttpClient) { }

        baseUrl = 'http://localhost:4000/api/elevators';

        createElevator(elevator: Elevator) {
            return this.httpClient.post<Elevator>(this.baseUrl, elevator);
        }
}
