import { Component, Inject, OnInit } from "@angular/core";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RobotService } from "../../../robot/robot.service";
import { Robot } from "../../../robot/robot";

@Component({
  selector: 'app-select-robot',
  templateUrl: './select-robot.component.html',
  styleUrls: ['./select-robot.component.css']
})
export class SelectRobotComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {taskType: string}, private robotService : RobotService,
              public dialogRef: MatDialogRef<SelectRobotComponent>) { }

  robots : Robot[] = [];

  ngOnInit(): void {
    this.robotService.getRobotsByTaskType(this.data.taskType).subscribe({
      next: (data) => {
        this.robots = data;
      },
      error: (err) => {
        window.alert(err);
      }
    });
  }

  selectRobot(robot : Robot) {
    this.dialogRef.close(robot);
  }

}
