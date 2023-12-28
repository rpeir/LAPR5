import {Component, OnInit, signal} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
      email: ['', [Validators.required]],
      password: ['', [Validators.minLength(10)]],
      nif: ['', [Validators.pattern('[0-9]{9}')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[92][0-9]{8}')]]
    });
    if (this.authService.isUser()) {
      this.userForm.controls['nif'].addValidators(Validators.required);
    }
  }

  ngOnInit(): void {
    this.authService.userObservable().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.userForm.patchValue(user);
        }
      },
      error: (err) => {
        window.alert(err.error);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (user.password === '') {
        delete user.password;
      }
      this.authService.updateUser({...user, id: this.user?.id} as User).subscribe({
        next: (user)=> {
          window.alert('User updated successfully.');
          location.reload();
        },
        error: (err) => {
          window.alert(err.error);
        }
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
