import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Task } from "./task";
import { TaskRequest } from "./taskRequest";

@Injectable({
  providedIn: "root"
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  private taskUrl = environment.apiURL + '/api/tasks';
  private requestsUrl = environment.apiURL + '/api/taskRequests';

  getPendingTasks() {
    return this.httpClient.get<Task[]>(`${this.taskUrl}/pending`, {observe: "body", responseType: "json"});
  }

  getPendingTaskRequests() {
    return this.httpClient.get<TaskRequest[]>(`${this.requestsUrl}?status=pending`, {observe: "body", responseType: "json"});
  }

  acceptTaskRequest(id: string, robotId: string) {
    let body = {
      taskRequestId: id,
      robotId: robotId
    }
    return this.httpClient.post<Task>(`${this.taskUrl}`, body);
  }

  rejectTaskRequest(id: string) {
    return this.httpClient.delete<TaskRequest>(`${this.requestsUrl}/${id}`, {observe: "body", responseType: "json"});
  }
}
