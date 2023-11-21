import { Component } from '@angular/core';
import { Robot } from "../robot";
import { RobotService } from "../robot.service";

@Component({
  selector: 'app-disable',
  templateUrl: './disable.component.html',
  styleUrls: ['./disable.component.css']
})
export class DisableComponent {

  disableOption: string | undefined;
  protected readonly options = ['nickName', 'code'];
  nickName: string = '';
  robotCode: string = '';

  constructor(private robotService : RobotService) {
  }

  disableRobot() {

    switch (this.disableOption) {
      case 'nickName':
        if (this.nickName == '') { alert("Please insert nickname"); return; }
        this.robotService.disableRobotByNickName(this.nickName).subscribe({
            next: (robot: Robot) => {
              alert("Robot " + robot.nickName + " disabled");
            },
            error: (error) => {
              alert("Error: " + error.error);
            }
          }
        );
        break;
      case 'code':
        if (this.robotCode == '') { alert("Please insert code"); return; }
        this.robotService.disableRobotByCode(this.robotCode).subscribe({
            next: (robot: Robot) => {
              alert("Robot " + robot.nickName + " disabled");
            },
            error: (error) => {
              alert("Error: " + error.error);
            }
          }
        );
        break;
      case undefined:
        alert("Please select an option");
        return;
    }
  }
}

