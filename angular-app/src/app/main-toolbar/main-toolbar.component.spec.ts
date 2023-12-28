import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainToolbarComponent } from './main-toolbar.component';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';
import { Role } from '../user/role';
import {UserRole} from "../user/UserRole";

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [MainToolbarComponent],
      providers: [
        { provide: AuthService, useValue: spy }
      ],
      imports: [
        RouterTestingModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userName and userRole on initialization', () => {
    const mockUser = { firstName: 'John', role: UserRole.TASK_MANAGER } as any;
    authServiceSpy.getUser.and.returnValue(mockUser);

    fixture.detectChanges();

    expect(component.userName).toBe('John');
    expect(component.userRole).toBe(UserRole.TASK_MANAGER);
  });

  it('should set userName to "Non logged user" if user is not logged in', () => {
    authServiceSpy.getUser.and.returnValue(null);

    fixture.detectChanges();

    expect(component.userName).toBe('Non logged user');
    expect(component.userRole).toBeUndefined();
  });


});
