import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import {Role} from "../user/role";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit{
  userName : string = '';
  userRole? : Role | string;
  constructor(private router: Router, private authService : AuthService) {}

  ngOnInit() {
    this.userName = this.authService.getUser()?.firstName ?? 'Non logged user';
    this.userRole = this.authService.getUser()?.role;
  }


  goToLogin() {
    this.router.navigate([""]);
  }

  goToHome() {
    this.router.navigate(["/task-manager"]);
  }
}
