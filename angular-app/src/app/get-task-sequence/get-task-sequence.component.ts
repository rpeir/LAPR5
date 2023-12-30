import { Component, OnInit } from "@angular/core";
import { Task } from "../task/task";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskSequenceService } from "./task-sequence.service";
import {FloorService} from "../floor/floor.service";

@Component({
  selector: "app-get-task-sequence",
  templateUrl: "./get-task-sequence.component.html",
  styleUrls: ["./get-task-sequence.component.css"]
})
export class GetTaskSequenceComponent implements OnInit {
  constructor(
    private taskSequenceService: TaskSequenceService,
    private route: ActivatedRoute,
    private floorService: FloorService
  ) {
  }

  atLeastOneCheckboxChecked = false;
  tasks: Task[] = [];
  displayedColumns = [
    "description",
    "type",
    "userId",
    "status",
    "pickupRoomId",
    "deliveryRoomId",
    "identificationCode",
    "senderName",
    "receiverName",
    "senderContact",
    "receiverContact",
    "confirmationCode",
    "emergencyNumber",
    "floorNr",
  ];
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
    this.taskSequenceService.currentTasks.subscribe({
      next: (tasks) => {
       this.tasks = tasks;
       this.getFloors(tasks);
      }
    }
    );
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

  private getFloors(tasks: Task[]) {
    tasks.map((task) => {
      if (task.floorId) {
        this.floorService.getFloorById(task.floorId).subscribe({
          next: (floor) => {
            task.floor = floor;
          }
        })
      }
    })
  }
}
