import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  private taskUrl = environment.apiURL + "/api/tasks";

  getPendingTasks() {
    return this.httpClient.get<any>(`${this.taskUrl}/pending`, {observe: "body", responseType: "json"});
  }
}
