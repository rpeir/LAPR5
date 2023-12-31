import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopyDataComponent } from './copy-data.component';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { of, throwError } from 'rxjs';
import {User} from "../../user/user";

describe('CopyDataComponent', () => {
  let component: CopyDataComponent;
  let fixture: ComponentFixture<CopyDataComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['getUserById']);
    authService = jasmine.createSpyObj('AuthService', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [CopyDataComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
      ],
    });

    fixture = TestBed.createComponent(CopyDataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export data successfully', () => {

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
    userService.getUserById.and.returnValue(of(mockUser));

    spyOn(window, 'alert');
    spyOn(document, 'createElement').and.callThrough();
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');

    component.exportData();

    expect(authService.getUser).toHaveBeenCalled();
    expect(userService.getUserById).toHaveBeenCalledWith(mockUser.id);

    // Additional expectations for Blob and link creation
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
  });

  it('should show an alert if the user is not logged in', () => {
    authService.getUser.and.returnValue(null);
    spyOn(window, 'alert');

    component.exportData();

    expect(window.alert).toHaveBeenCalledWith('You are not logged in');
    expect(userService.getUserById).not.toHaveBeenCalled();
  });

  it('should show an alert if an error occurs during data export', () => {
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
    const errorMessage = 'Error exporting data';
    userService.getUserById.and.returnValue(throwError({ error: { error: errorMessage } }));
    spyOn(window, 'alert');

    component.exportData();

    expect(authService.getUser).toHaveBeenCalled();
    expect(userService.getUserById).toHaveBeenCalledWith(mockUser.id);
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorMessage));
  });
});
