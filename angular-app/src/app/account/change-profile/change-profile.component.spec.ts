import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeProfileComponent } from './change-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { of } from 'rxjs';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {User} from "../../user/user";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ChangeProfileComponent', () => {
  let component: ChangeProfileComponent;
  let fixture: ComponentFixture<ChangeProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUser : User = {
    id: "123",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '912345678',
    nif: '123456789',
    password: '',
    role: {
      id: "123",
      name: "user"
    }
  };

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['userObservable', 'isUser', 'updateUser']);
    userService = jasmine.createSpyObj('UserService', ['']);

    TestBed.configureTestingModule({
      declarations: [ChangeProfileComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UserService, useValue: userService },
      ],
    });

    authService.userObservable.and.returnValue(of(mockUser));

    fixture = TestBed.createComponent(ChangeProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    fixture.detectChanges();

    const toEqual = {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      password: '',
      nif: mockUser.nif,
      phoneNumber: mockUser.phoneNumber
    }

    expect(component.userForm.value).toEqual(toEqual);
  });

  it('should show NIF field if a user is logged in', () => {
    authService.isUser.and.returnValue(true);
    fixture.detectChanges();

    const nifField = fixture.debugElement.nativeElement.querySelector('[formControlName="nif"]');
    expect(nifField).toBeTruthy();
  });

  it('should hide NIF field if a user is not logged in', () => {
    authService.isUser.and.returnValue(false);
    fixture.detectChanges();

    const nifField = fixture.debugElement.nativeElement.querySelector('[formControlName="nif"]');
    expect(nifField).toBeFalsy();
  });


  it('should call showHidePassword when the password checkbox is changed', () => {
    spyOn(component, 'showHidePassword');
    const checkbox = fixture.debugElement.nativeElement.querySelector('mat-checkbox');

    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.showHidePassword).toHaveBeenCalled();
  });

  it('should show password when checkbox is on', () => {
    // Arrange
    spyOn(component, 'showHidePassword');
    component.showHidePassword(new MatCheckboxChange());

    expect(component.showHidePassword).toHaveBeenCalled();
    const passwordField = fixture.debugElement.nativeElement.querySelector('[formControlName="password"]');
    expect(passwordField.type).toEqual('text');
  });

  it('should hide password when checkbox is off', () => {
    // Arrange
    spyOn(component, 'showHidePassword');
    // checkbox is off by default

    fixture.detectChanges();

    expect(component.showHidePassword).not.toHaveBeenCalled();
    const passwordField = fixture.debugElement.nativeElement.querySelector('[formControlName="password"]');
    expect(passwordField.type).toEqual('password');
  });
});
