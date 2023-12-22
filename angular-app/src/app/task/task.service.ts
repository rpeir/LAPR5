import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { TaskRequest } from "./taskRequest";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = environment.apiURL + "/api/tasks";
  private requestsUrl = environment.apiURL + "api/taskRequests"
  constructor(private httpClient : HttpClient) { }

  pendingRequests() : Observable<TaskRequest[]> {
    return this.httpClient.get<TaskRequest[]>(this.requestsUrl+"?status=Pending");
  }


}
