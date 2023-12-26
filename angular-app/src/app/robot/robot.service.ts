import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Robot } from "./robot";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private httpClient: HttpClient) { }

  private robotUrl = environment.apiURL + "/api/robots";

  createRobot(robot: Robot): Observable<Robot> {
    return this.httpClient.post<Robot>(`${this.robotUrl}`, robot,
      {headers: {"Content-Type": "application/json"}, observe: "body", responseType: "json"});
  }
  listAllRobots(): Observable<Robot[]> {
    return this.httpClient.get<Robot[]>(`${this.robotUrl}`);
  }

  disableRobotByNickName(nickName: string) {
    return this.httpClient.patch<Robot>(`${this.robotUrl}/disable-by-nick`, { nickName: nickName },
      {headers: {"Content-Type": "application/json"}, observe: "body", responseType: "json"})
  }

  disableRobotByCode(robotCode: string) {
    return this.httpClient.patch<Robot>(`${this.robotUrl}/disable-by-code`, { robotCode: robotCode },
      {headers: {"Content-Type": "application/json"}, observe: "body", responseType: "json"})
  }

  getRobotsByTaskType(taskType: string) {
    return this.httpClient.get<Robot[]>(`${this.robotUrl}/task-type/${taskType}`, {observe: "body", responseType: "json"});
  }
}
