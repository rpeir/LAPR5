import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateManagerComponent } from './create-manager.component';
import { UserService } from '../user.service';
import { RoleService } from '../role.service';
import { of, throwError } from 'rxjs';
import {User} from "../user";
import {MainToolbarComponent} from "../../main-toolbar/main-toolbar.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

describe('CreateManagerComponent', () => {
  let component: CreateManagerComponent;
  let mainToolbarComponent: MainToolbarComponent;
  let fixture: ComponentFixture<CreateManagerComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let roleService: jasmine.SpyObj<RoleService>;


  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['createManager']);
    roleService = jasmine.createSpyObj('RoleService', ['listRoles']);

    TestBed.configureTestingModule({
      declarations: [CreateManagerComponent,MainToolbarComponent], // Add AppMainToolbarComponent here
      imports: [HttpClientModule,MatSidenavModule,MatInputModule,MatSelectModule,MatToolbarModule,MatIconModule
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: RoleService, useValue: roleService },
      ],
    });


    fixture = TestBed.createComponent(CreateManagerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call listRoles on ngOnInit', () => {
    spyOn(component, 'listRoles');

    component.ngOnInit();

    expect(component.listRoles).toHaveBeenCalled();
  });

  it('should create a manager successfully', () => {
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
        name: "fleet manager"
      }
    };
    userService.createManager.and.returnValue(of({ userDTO: mockUser, token: '123'}));

    spyOn(window, 'alert');

    component.createManager();

    expect(userService.createManager).toHaveBeenCalledWith(component.user);
    expect(window.alert).toHaveBeenCalledWith(
      'Manager created successfully \n' +
      'First Name: ' + mockUser.firstName + '\n' +
      'Last Name: ' + mockUser.lastName + '\n' +
      'Email: ' + mockUser.email + '\n'
    );
  });

  it('should show an alert if an error occurs during manager creation', () => {
    const errorMessage = 'Error creating manager';
    userService.createManager.and.returnValue(throwError({ error: errorMessage }));
    spyOn(window, 'alert');

    component.createManager();

    expect(userService.createManager).toHaveBeenCalledWith(component.user);
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorMessage));
  });

  it('should list roles successfully and filter out the "user" role', () => {
    const roles = [
      { id: '1', name: 'fleet manager' },
      { id: '2', name: 'task manager' },
      { id: '3', name: 'user' },
      { id: '4', name: 'campus manager' },
    ];
    roleService.listRoles.and.returnValue(of(roles));

    component.listRoles();

    expect(roleService.listRoles).toHaveBeenCalled();
    expect(component.roles).toEqual([
      { id: '1', name: 'fleet manager' },
      { id: '2', name: 'task manager' },
      { id: '4', name: 'campus manager' },
    ]);
  });

  it('should show an alert if an error occurs during role listing', () => {
    const errorMessage = 'Error listing roles';
    roleService.listRoles.and.returnValue(throwError({ error: { error: errorMessage } }));
    spyOn(window, 'alert');

    component.listRoles();

    expect(roleService.listRoles).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(errorMessage));
  });
});
