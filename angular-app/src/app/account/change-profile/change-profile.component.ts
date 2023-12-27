import {Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../user/user.service";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../user/user";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  userForm: FormGroup;
  user? : User;
  passwordShow : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService : UserService
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(10)]],
      nif: ['', Validators.pattern('[0-9]{9}')],
      phoneNumber: ['', [Validators.required, Validators.pattern('[92][0-9]{8}')]]
    });
  }

  ngOnInit(): void {
    this.authService.userObservable().subscribe((user) => {
      if (user) {
        this.user = user;
        this.userForm.patchValue(user);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser({...this.userForm.value, id: this.user?.id} as User).subscribe(() => {
        console.log('User updated successfully.');
        location.reload();
      });
    }
  }

  isUser() {
    return this.authService.isUser();
  }

  showHidePassword(change: MatCheckboxChange) {
    this.passwordShow = change.checked;
  }
}
