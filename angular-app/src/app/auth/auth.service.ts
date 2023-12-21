import { Injectable } from '@angular/core';
import { User } from "../user/user";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private theUrl = environment.apiURL + "/api/auth/signin";
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }


  login(email:string, password:string ) {
    return this.http.post<any>(this.theUrl, {email, password}).pipe(
      map((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }),
      catchError(this.handleError<any>('login'))
    )
  }

  logout() { localStorage.removeItem('user'); }

  getToken(): string | null {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).token :null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logout();
      window.alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
