import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TaskRequest } from "./taskRequest";

@Injectable({
  providedIn: "root"
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  private taskUrl = environment.apiURL + '/api/tasks';
  private requestsUrl = environment.apiURL + 'api/taskRequests';

  getPendingTasks() {
    return this.httpClient.get<TaskRequest[]>(`${this.taskUrl}/pending`, {observe: "body", responseType: "json"});
  }
}
