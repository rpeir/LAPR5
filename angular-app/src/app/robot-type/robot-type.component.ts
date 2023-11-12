import { Component } from '@angular/core';
import { RobotType } from "./robot-type";
import { RobotTypeService } from './robot-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-robot-type',
  templateUrl: './robot-type.component.html',
  styleUrls: ['./robot-type.component.css']
})
export class RobotTypeComponent {

  constructor(private robotTypeService: RobotTypeService, private location: Location) {
  }

   robotType: RobotType = new RobotType();
  createRobotType() {
    this.robotTypeService.createRobotType(this.robotType).subscribe({
      next: (data) => {
        window.alert("Robot type created successfully \n"
          + "Name: " + data.name + "\n"
          + "Task types: " + data.taskTypes + "\n"
          + "Robot type model: " + data.robotTypeModel + "\n"
          + "Brand: " + data.brand + "\n"
          + "Id: " + data.id + "\n"
          + "TasksTypes: " + data.taskTypes + "\n");
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  taskTypes: string[] = ["delivery",  "surveillance"];
  selectedTaskTypes: string[] = [];

  toggleSelection(taskType: string): void {
    if (this.isSelected(taskType)) {
      this.selectedTaskTypes = this.selectedTaskTypes.filter(o => o !== taskType);
    } else {
      this.selectedTaskTypes.push(taskType);
    }
    this.robotType.taskTypes = this.selectedTaskTypes;
  }

  isSelected(taskType: string): boolean {
    return this.selectedTaskTypes.includes(taskType);
  }
}
