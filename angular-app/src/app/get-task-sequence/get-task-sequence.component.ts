import { Component, OnInit } from "@angular/core";
import { Task } from "../task/task";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskSequenceService } from "./task-sequence.service";

@Component({
  selector: "app-get-task-sequence",
  templateUrl: "./get-task-sequence.component.html",
  styleUrls: ["./get-task-sequence.component.css"]
})
export class GetTaskSequenceComponent implements OnInit {
  constructor(private taskSequenceService: TaskSequenceService, private route: ActivatedRoute) {
  }

  atLeastOneCheckboxChecked = false;
  tasks: Task[] = [];
  displayedColumns = ["description",
    "type",
    "userId",
    "status",
    "pickupRoomId",
    "deliveryRoomId",
    "taskRequestId",
    "senderName",
    "receiverName",
    "senderContact",
    "receiverContact",
    "confirmationCode",
    "emergencyNumber",
    "floorId"];
  activateNrGenerations = false;
  activateStabilization = false;
  activateIdealCost = false;
  nrGenerations: number = 0;
  stabilizationCriteriaValue: number = 0;
  idealCost: number = 0;
  taskSequence: Task[] | undefined;
  mutationProbability: number = 0;
  populationSize: number = 0;
  crossOverProbability: number = 0;
  elitismRate: number = 0


  ngOnInit(): void {
    this.taskSequenceService.currentTasks.subscribe(tasks => this.tasks = tasks);
  }

  getSequence() {
    this.taskSequenceService.getSequence(this.nrGenerations, this.stabilizationCriteriaValue, this.idealCost, this.crossOverProbability, this.mutationProbability, this.populationSize, this.elitismRate, this.tasks).subscribe({
        next: taskSequence => {
          this.taskSequence = taskSequence;
        },
        error: err => {
          window.alert(err);
        }
      }
    )
  }

  toggleActivateNrGenerations() {
    this.activateNrGenerations = !this.activateNrGenerations;
    this.validateCheckboxes();
  }

  toggleStabilizationCriteria() {
    this.activateStabilization = !this.activateStabilization;
    this.validateCheckboxes();
  }

  toggleIdealCostCriteria() {
    this.activateIdealCost = !this.activateIdealCost;
    this.validateCheckboxes();
  }

  validateCheckboxes() {
    this.atLeastOneCheckboxChecked =
      this.activateNrGenerations || this.activateStabilization || this.activateIdealCost;
  }
}
