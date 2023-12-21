import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserEmail } from "../user/userEmail";
import { UserPassword } from "../user/userPassword";
import { Role } from "../user/role";
import { User } from "../user/user";
import { UserService } from "../user/user.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-utente",
  templateUrl: "./utente.component.html",
  styleUrls: ["./utente.compoent.css"]
})
export class UtenteComponent {

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
  }
  ADMIN = 'admin';
  CAMPUS_MANAGER = 'campus manager';
  FLEET_MANAGER = 'fleet manager';
  TASK_MANAGER = 'task manager';
  USER = 'user';


  firstName: string | undefined;
  lastName: string | undefined;
  email = "";
  password = " ";
  nif?: string | undefined;
  role: Role | undefined;
  user = new User();




  goToSignup() {
    this.router.navigate(["/user/create-user"]);

  }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe({
          next: (data) => {
            const role = data.userDTO.role;
            if (role === this.ADMIN) {
              this.goToAdministratorDeSistema();
            } else if (role === this.CAMPUS_MANAGER) {
              this.goToGestorDeCampus();
            } else if (role === this.FLEET_MANAGER) {
              this.goToGestorDeFrota();
            } else if (role === this.TASK_MANAGER) {
              this.goToGestorDeTarefas();
            } else if (role === this.USER) {
              this.goToUtente();
            }

          }
        }
      );
  }

  goToGestorDeCampus() {
    this.router.navigate(['/campus-manager']);
  }

  goToGestorDeFrota() {
    this.router.navigate(['/fleet-manager']);
  }

  goToUtente() {
    this.router.navigate(['/utente']);
  }

  goToAdministratorDeSistema() {
    this.router.navigate(['/system-administrator']);
  }

  goToGestorDeTarefas() {
    this.router.navigate(['/task-manager']);
  }
}
