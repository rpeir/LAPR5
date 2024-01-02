import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  createTaskRequest(taskRequest: TaskRequest) {
    return this.httpClient.post<TaskRequest>(`${this.requestsUrl}`,taskRequest,{
      headers: { 'Content-Type': 'application/json' },
      observe: 'body',
      responseType: 'json',
    });
  }

  getAllTaskRequests() {
    return this.httpClient.get<TaskRequest[]>(`${this.requestsUrl}`, {observe: "body", responseType: "json"});
  }

  getTaskRequestByParams(userId?:string, status?:string, roboType?:string, startTime?:Date, endTime?:Date) {
    // params are in the form of a query string
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }
    if (status) {
      params = params.append('status', status);
    }
    if (roboType) {
      params = params.append('roboType', roboType);
    }
    if (startTime) {
      params = params.append('startTime', startTime.toJSON());
    }
    if (endTime) {
      params = params.append('endTime', endTime.toJSON());
    }

    return this.httpClient.get<TaskRequest[]>(`${this.requestsUrl}`, {params: params, responseType: "json"});
  }
}
