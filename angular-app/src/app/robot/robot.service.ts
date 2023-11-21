import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Robot } from "./robot";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private httpClient: HttpClient) { }

  private robotUrl = "http://localhost:4000/api/robots";

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
}
