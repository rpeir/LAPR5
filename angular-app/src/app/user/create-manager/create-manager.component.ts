import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {UserEmail} from "../userEmail";
import {UserPassword} from "../userPassword"
import {Role} from "../role";
import {User} from "../user";
import {RoleService} from "../role.service";

@Component({
    selector: 'app-create',
    templateUrl: './create-manager.component.html',
    styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent implements OnInit {
    constructor(private userService:UserService, private roleService: RoleService) {

    }
    firstName: string | undefined;
    lastName: string | undefined;
    email: UserEmail | undefined;
    password: UserPassword | undefined;
    nif?: string | undefined;
    role: Role| undefined;
    roles: Role[]| undefined;
    user = new User();

    ngOnInit(): void {
        this.listRoles();
    }

    createManager(){
        this.userService.createManager(this.user).subscribe({
            next: (data) => {
                window.alert("Manager created successfully \n"
                    + "First Name: " + data.userDTO.firstName + "\n"
                    + "Last Name: " + data.userDTO.lastName + "\n"
                    + "Email: " + data.userDTO.email + "\n"
                );
            },
            error: (error) => {
                window.alert(JSON.stringify(error.error));
            }
        });
    }

    listRoles() {
      this.roleService.listRoles().subscribe({
        next: (data) => {
            this.roles = data;
          this.roles = data.filter(role => role.name !== 'user');
        },
        error: (error) => {
          window.alert(JSON.stringify(error.error.error));
        }
      });
    }
}
