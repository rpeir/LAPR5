import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RobotType } from "./robot-type";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RobotTypeService {

  constructor(private httpClient: HttpClient) {
  }

  private robotTypeUrl = "http://localhost:4000/api/robotTypes";

  createRobotType(robotType: RobotType): Observable<RobotType> {
    return this.httpClient.post<RobotType>(`${this.robotTypeUrl}`, robotType);
  }

  getRobotTypes(): Observable<RobotType[]> {
    return this.httpClient.get<RobotType[]>(`${this.robotTypeUrl}`);
  }

}
