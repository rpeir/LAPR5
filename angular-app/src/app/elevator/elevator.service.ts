import {Injectable} from "@angular/core";
import {Elevator} from "./elevator";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ElevatorService {

        constructor(private httpClient: HttpClient) { }

        private baseUrl = environment.apiURL + '/api/elevators';

        createElevator(elevator: Elevator) {
            return this.httpClient.post<Elevator>(`${this.baseUrl}`, elevator);
        }

        updateElevator(elevator: Elevator) {
            return this.httpClient.patch<Elevator>(`${this.baseUrl}`, elevator);

        }

        replaceElevator(elevator: Elevator) {
          return this.httpClient.put<Elevator>(`${this.baseUrl}`, elevator);

        }
        listAllElevators(buildingDesignation:string) {
            return this.httpClient.get<Elevator[]>(`${this.baseUrl}/?buildingDesignation=${buildingDesignation}`);
        }

}
