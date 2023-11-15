import {Component, OnInit} from '@angular/core';
import {Robot} from "../robot";
import {RobotService} from "../robot.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  constructor(private robotService: RobotService) {
  }

  robots: Robot[] | undefined;
  ngOnInit() {
  }


  listRobots() {
    this.robotService.listAllRobots().subscribe({
      next: (data) => {
        this.robots = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
}
