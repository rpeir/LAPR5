import { Component, OnInit } from "@angular/core";
import { TaskRequest } from "../taskRequest";
import { TaskService } from "../task.service";
import { UserService } from "../../user/user.service";
import { User } from "../../user/user";

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.css']
})
export class ApproveRejectComponent implements OnInit{

  requests : TaskRequest[] = [];
  users : User[] = []

  ngOnInit(): void {
    this.taskService.pendingRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err) => {
        window.alert(err);
      }
    })
  }

  constructor(private taskService : TaskService, private userService : UserService) {
  }

}
