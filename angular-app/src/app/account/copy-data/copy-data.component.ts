import { Component } from "@angular/core";
import { UserService } from "../../user/user.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-copy-data',
  templateUrl: './copy-data.component.html',
  styleUrls: ['./copy-data.component.css']
})
export class CopyDataComponent {
  id?: string ;
  firstName: string| undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  password: string | undefined;
  nif: string | undefined;
  role: string | undefined;

  constructor(
    private userService: UserService, private authService: AuthService
  ) {}

  exportData() {
    const user = this.authService.getUser();
    if(user==null){
      window.alert("You are not logged in");
      return;
    }
    const id=user.id;
    this.userService.getUserById(id).subscribe({
      next: (responseData) => {
        const data={...responseData,id:undefined,password:undefined,role:undefined};
        // Convert user data to JSON string
        const json = JSON.stringify(data, null, 2);

        // Create a Blob containing the JSON data
        const blob = new Blob([json], { type: 'application/json' });

        // Create a link element
        const link = document.createElement('a');

        // Set the link's href attribute to the Blob
        link.href = window.URL.createObjectURL(blob);

        // Set the download attribute with a desired file name
        link.download = 'user_data.json';

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click on the link to initiate the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      },
      error: (error) => {
        window.alert(JSON.stringify(error.error.error));
      }
    });
  }
}
