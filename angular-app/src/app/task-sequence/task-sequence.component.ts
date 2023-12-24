import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task/task.service";
import { Task } from "../task/task";
import { entries } from "lodash";
import { Router } from "@angular/router";
import { TaskSequenceService } from "../get-task-sequence/task-sequence.service";

@Component({
  selector: "app-task-sequence",
  templateUrl: "./task-sequence.component.html",
  styleUrls: ["./task-sequence.component.css"]
})
export class TaskSequenceComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private taskSequenceService: TaskSequenceService) {
  }
  selectedTasks: Task[] = [];

  robotTasks: { robot: string, tasks: Task[] }[] = [];
  displayedColumns  = ['description',
    'type',
    'userId',
    'status',
    'pickupRoomId',
    'deliveryRoomId',
    'taskRequestId',
    'senderName',
    'receiverName',
    'senderContact',
    'receiverContact',
    'confirmationCode',
    'emergencyNumber',
    'floorId'];

  ngOnInit(): void {
    this.taskService.getPendingTasks().subscribe({
        next: async (data) => {
          this.organizeTasksByRobot(data);
        },
        error: (error) => {
          window.alert(error.error.error);
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
      this.router.navigate(['/startSequence']);
  }
}
