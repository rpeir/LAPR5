import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserEmail} from "../user/userEmail";
import {UserPassword} from "../user/userPassword";
import {Role} from "../user/role";
import {User} from "../user/user";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-utente',
  templateUrl: './utente.component.html',
  styleUrls: ['./utente.compoent.css']
})
export class UtenteComponent {

  constructor(private userService:UserService, private router:Router) {
  }
  firstName: string | undefined;
  lastName: string | undefined;
  email: UserEmail | undefined;
  password: UserPassword | undefined;
  nif?: string | undefined;
  role: Role| undefined;
  user = new User();

  goToSignup() {
    this.router.navigate(['/user/create-user'])

  }
}
