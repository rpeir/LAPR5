import { Component, OnInit } from '@angular/core';
import { Robot } from "../robot";
import { RobotTypeService } from "../../robot-type/robot-type.service";
import { CreateRobotService } from "./create-robot.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './createRobot.component.html',
  styleUrls: ['./createRobot.component.css']
})
export class CreateRobotComponent implements OnInit{
  constructor(private robotTypeService: RobotTypeService, private location: Location, private createRobotService: CreateRobotService) {

  }


  robot = new Robot();
  robotTypes: any;

  createRobot() {
    this.createRobotService.createRobot(this.robot).subscribe(data => {
      window.alert("Robot created successfully \n"
                  + "Nickname: " + data.nickName + "\n"
                  + "Robot type: " + data.robotType + "\n"
                  + "Description: " + data.description + "\n"
                  + "Robot Code: " + data.robotCode + "\n"
                  + "Serial number: " + data.serialNr + "\n" );

      this.location.back();
    }, error => {
      window.alert("Error! Robot not created" + "\n" + error.error.body);
      this.location.back();
    });
  }

  ngOnInit() {
     this.robotTypeService.getRobotTypes().subscribe(data => {
       this.robotTypes = data;
     });
  }

  getRobotTypeInfo(robotType: any) {
    return "TasksTypes: " + robotType.taskTypes ;
  }
}
