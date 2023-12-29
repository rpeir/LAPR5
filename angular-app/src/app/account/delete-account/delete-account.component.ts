import {Component} from "@angular/core";
import {UserService} from "../../user/user.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  deleteAccount() {
    const user = this.authService.getUser();
    if (user == null) {
      window.alert("You are not logged in");
      return;
    }
    const id = user.id;
    this.userService.deleteUser(id).subscribe({
      next: (responseData) => {
        window.alert(JSON.stringify(responseData));
        this.router.navigate(['/logout']);
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
}
