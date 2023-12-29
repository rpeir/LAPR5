import { Injectable } from '@angular/core';
import { User } from "../user/user";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Role} from "../user/role";
import {UserRole} from "../user/UserRole";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  private tokenSubject: BehaviorSubject<string | null>;
  private user: Observable<User | null>;
  private token : Observable<string | null>;
  private theUrl = environment.apiURL + "/api/auth/signin";
  private baseUrl = environment.apiURL + "/api/auth";
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.tokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
    );
    this.token = this.tokenSubject.asObservable();
    this.user = this.userSubject.asObservable();
  }

  public getUser(): User | null {
    return this.userSubject.value;
  }

  public userObservable(): Observable<User | null> {
    return this.user;
  }


  login(email:string, password:string ) {
    return this.http.post<any>(this.theUrl, {email, password}).pipe(
      map((user: { token : string, userDTO : User}) => {
        localStorage.setItem('user', JSON.stringify(user.userDTO));
        localStorage.setItem('token', user.token);
        this.tokenSubject.next(user.token);
        this.userSubject.next(user.userDTO);
        return user;
      }),
      catchError(this.handleError<any>('login'))
    )
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem("consent");
    this.userSubject.next(null); }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logout();
      window.alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isTaskManager() {
    const role : Role | string | undefined = this.getUser()?.role;
    if (role instanceof Role) {
      return role.name === UserRole.TASK_MANAGER;
    } else if (role) {
      return role === UserRole.TASK_MANAGER;
    }
    return false;
  }

  isFleetManager() {
    const role : Role | string | undefined = this.getUser()?.role;
    if (role instanceof Role) {
      return role.name === UserRole.FLEET_MANAGER;
    } else if (role) {
      return role === UserRole.FLEET_MANAGER;
    }
    return false;
  }

  isCampusManager() {
    const role : Role | string | undefined = this.getUser()?.role;
    if (role instanceof Role) {
      return role.name === UserRole.CAMPUS_MANAGER;
    } else if (role) {
      return role === UserRole.CAMPUS_MANAGER;
    }
    return false;
  }

  isAdmin() {
    const role : Role | string | undefined = this.getUser()?.role;
    if (role instanceof Role) {
      return role.name === UserRole.ADMIN;
    } else if (role) {
      return role === UserRole.ADMIN;
    }
    return false;
  }

  isUser() {
    const role : Role | string | undefined = this.getUser()?.role;
    if (role instanceof Role) {
      return role.name === UserRole.USER;
    } else if (role) {
      return role === UserRole.USER;
    }
    return false;
  }

  updateUser(user: User): Observable<User> {
    const updated = this.http.patch<User>(`${this.baseUrl}`, user);
    updated.subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }
    });
    return updated;
  }
}
