import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-logout',
  template: ``
})
export class LogoutComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) {}


  ngOnInit() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

}
