import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterUserComponent } from './register-user.component';
import { UserService } from '../user.service';
import { RoleService } from '../role.service';
import { Observable, of } from 'rxjs';
import { UserRequest } from '../UserRequest';
import { User } from '../user';
import {MainToolbarComponent} from "../../main-toolbar/main-toolbar.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let userService: UserService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterUserComponent,MainToolbarComponent],
      imports: [HttpClientModule,MatSidenavModule,MatInputModule,MatSelectModule,MatToolbarModule,MatIconModule],
      providers: [UserService, RoleService],
    });
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pending requests on initialization', () => {
    const mockRequest={
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
    const mockRequests: UserRequest[] = [mockRequest];



    spyOn(userService, 'listPendingRequests').and.returnValue(of(mockRequests));


    component.ngOnInit();

    expect(component.requests).toEqual(mockRequests);

  });
});
