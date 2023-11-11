import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Robot } from "../robot";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateRobotService {

  constructor(private httpClient: HttpClient) { }

  private robotUrl = "http://localhost:4000/api/robots";

  createRobot(robot: Robot): Observable<Robot> {
    return this.httpClient.post<Robot>(`${this.robotUrl}`, robot);
  }

}
