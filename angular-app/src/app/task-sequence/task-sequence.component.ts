import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task/task.service";
import { RobotService } from "../robot/robot.service";
import { Robot } from "../robot/robot";
import { Task } from "../task/task";

@Component({
  selector: "app-task-sequence",
  templateUrl: "./task-sequence.component.html",
  styleUrls: ["./task-sequence.component.css"]
})
export class TaskSequenceComponent implements OnInit {
  taskList: Task[] | undefined;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getPendingTasks().subscribe({
        next: (data) => {
          this.taskList = data;
        },
        error: (error) => {
          window.alert(error.error.error);
        }
      }
    );
  }


}
