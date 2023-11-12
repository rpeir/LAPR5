import { Component, OnInit } from "@angular/core";
import { Robot } from "../robot";
import { RobotTypeService } from "../../robot-type/robot-type.service";
import { RobotService } from "../robot.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-create",
  templateUrl: "./createRobot.component.html",
  styleUrls: ["./createRobot.component.css"]
})
export class CreateRobotComponent implements OnInit {
  constructor(private robotTypeService: RobotTypeService, private location: Location, private createRobotService: RobotService) {

  }

  robot = new Robot();
  robotTypes: any;

  createRobot() {
    this.createRobotService.createRobot(this.robot).subscribe({
      next: (data) => {
        window.alert("Robot created successfully \n"
          + "Nickname: " + data.nickName + "\n"
          + "Robot Type: " + data.robotType + "\n"
          + "Description: " + data.description + "\n"
          + "Robot code: " + data.robotCode + "\n"
          + "Robot serial number: " + data.serialNr + "\n");

        this.location.back();
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  ngOnInit() {
    this.robotTypeService.getRobotTypes().subscribe({
      next: (data) => {
        this.robotTypes = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }

  getRobotTypeInfo(robotType: any) {
    return "TasksTypes: " + robotType.taskTypes;
  }
}
