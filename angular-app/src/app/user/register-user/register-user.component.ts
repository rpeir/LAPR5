import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import {Elevator} from "../../elevator/elevator";
import {UserEmail} from "../userEmail";
import {UserRequest} from "../UserRequest";
import {User} from "../user";
import {UserPassword} from "../userPassword";
import {Role} from "../role";
import {RoleService} from "../role.service";

@Component({
  selector: 'app-create',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private userService: UserService, private roleService:RoleService) {
  }
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  nif?: string | undefined;
  role: Role = new Role();
  roles: Role[]|undefined;
  user=new User();
  requests: UserRequest[] | undefined;
  request = new UserRequest();



  ngOnInit() {
    this.userService.listPendingRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
    this.roleService.listRoles().subscribe({
      next:(data)=>{
        this.roles=data;
      },
      error:(error)=> {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
  acceptUser(request : UserRequest){
    this.user.id = request.id;
    this.userService.createUser(this.user).subscribe({
      next: (data) => {
        window.alert("User registered successfully \n"
          + "First Name: " + data.userDTO.firstName + "\n"
          + "Last Name: " + data.userDTO.lastName + "\n"
          + "Email: " + data.userDTO.email + "\n"
        );
        window.location.reload();
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error));
      }
    });
  }
  declineUser(request:UserRequest){
    this.user.id=request.id;
    this.userService.declineUser(this.user.id).subscribe({
      next: (data) => {
        window.alert("User declined successfully \n"
        );
        window.location.reload();
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error));
      }
    });
  }
}
