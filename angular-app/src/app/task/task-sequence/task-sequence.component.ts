import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { Task } from "../task";
import { Router } from "@angular/router";
import { TaskSequenceService } from "../get-task-sequence/task-sequence.service";
import {FloorService} from "../../floor/floor.service";

@Component({
  selector: "app-task-sequence",
  templateUrl: "./task-sequence.component.html",
  styleUrls: ["./task-sequence.component.css"]
})
export class TaskSequenceComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private taskSequenceService: TaskSequenceService,
    private floorService: FloorService
  ) {
  }
  selectedTasks: Task[] = [];

  robotTasks: { robot: string, tasks: Task[] }[] = [];
  displayedColumns  = ['description',
    'type',
    'userId',
    'status',
    'pickupRoomId',
    'deliveryRoomId',
    'identificationCode',
    'senderName',
    'receiverName',
    'senderContact',
    'receiverContact',
    'confirmationCode',
    'emergencyNumber',
    'floorNr',
  ];
  waiting: boolean = true;

  ngOnInit(): void {
    this.taskService.getPendingTasks().subscribe({
        next: async (data) => {
          this.getFloors(data);
          this.organizeTasksByRobot(data);
          this.waiting = false;
        },
        error: (error) => {
          window.alert(error.error.error);
          this.waiting = false;
        }
      }
    );
  }

  private organizeTasksByRobot(tasks: Task[]): void {
    this.robotTasks = [];

    for (const task of tasks) {
      const robot = task.robot;
      if (robot != null) {
        const existingRobot = this.robotTasks.find(rt => rt.robot === robot);
        if (existingRobot) {
          existingRobot.tasks.push(task);
        } else {
          this.robotTasks.push({ robot, tasks: [task] });
        }
      }
    }
  }

  getTaskSequence(tasks: Task[]) {
    this.taskSequenceService.changeTasks(tasks);
    this.router.navigate(['/tasks/startSequence']);
  }

  private getFloors(data: Task[]) {
    data.map((task) => {
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
