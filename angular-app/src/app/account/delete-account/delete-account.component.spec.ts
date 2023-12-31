import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAccountComponent } from './delete-account.component';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import {User} from "../../user/user";

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getUser']);
    userService = jasmine.createSpyObj('UserService', ['deleteUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [DeleteAccountComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
      ],
    });

    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete account and navigate to /logout on success', () => {
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
    authService.getUser.and.returnValue(mockUser);
    userService.deleteUser.and.returnValue(of({id: mockUser.id, firstName: mockUser.firstName, lastName: mockUser.lastName, email: mockUser.email, phoneNumber: mockUser.phoneNumber, nif: mockUser.nif, password: mockUser.password, role: mockUser.role}));

    component.deleteAccount();

    expect(authService.getUser).toHaveBeenCalled();
    expect(userService.deleteUser).toHaveBeenCalledWith(mockUser.id);
    expect(router.navigate).toHaveBeenCalledWith(['/logout']);
  });

  it('should show an alert if the user is not logged in', () => {
    authService.getUser.and.returnValue(null);
    spyOn(window, 'alert');

    component.deleteAccount();

    expect(window.alert).toHaveBeenCalledWith('You are not logged in');
    expect(userService.deleteUser).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should show an alert if an error occurs during account deletion', () => {
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
    authService.getUser.and.returnValue(mockUser);
    const errorMessage = 'Error deleting account';
    userService.deleteUser.and.returnValue(throwError({ error: { error: errorMessage } }));
    spyOn(window, 'alert');

    component.deleteAccount();

    expect(authService.getUser).toHaveBeenCalled();
    expect(userService.deleteUser).toHaveBeenCalledWith(mockUser.id);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorMessage));
  });
});
