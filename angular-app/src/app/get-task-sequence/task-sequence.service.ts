import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Task } from '../task/task';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskSequenceService {
  private passedTasks = new BehaviorSubject<Task[]>(new Array<Task>());
  currentTasks = this.passedTasks.asObservable();

  private taskUrl = environment.apiURL + "/api/planning/tasksSequence";

  constructor(private httpClient: HttpClient) { }


  changeTasks(tasks: Task[]) {
    this.passedTasks.next(tasks);
  }

  getSequence(nrGenerations: number, stabilizationCriteriaValue: number, idealCost: number, tasks: Task[]) {
    return this.httpClient.post<Task[]>(`${this.taskUrl}?nrGenerations=${nrGenerations}&stabilizationCriteriaValue=${stabilizationCriteriaValue}&idealCost=${idealCost}` , {tasks}, {observe: "body", responseType: "json"});
  }
}
