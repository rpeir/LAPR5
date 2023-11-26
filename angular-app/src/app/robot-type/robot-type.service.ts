import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RobotType } from "./robot-type";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class RobotTypeService {

  constructor(private httpClient: HttpClient) {
  }

  private robotTypeUrl = environment.apiURL + "/api/robotTypes";

  createRobotType(robotType: RobotType): Observable<RobotType> {
    return this.httpClient.post<RobotType>(`${this.robotTypeUrl}`, robotType,
      {headers: {"Content-Type": "application/json"}, observe: "body", responseType: "json"});
  }

  getRobotTypes(): Observable<RobotType[]> {
    return this.httpClient.get<RobotType[]>(`${this.robotTypeUrl}`,
      {observe: "body", responseType: "json"});
  }

}
