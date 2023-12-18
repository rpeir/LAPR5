import { Injectable } from '@angular/core';
import { User } from "../user/user";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private theUrl = 'http://localhost:4000/api/auth/login'
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }


  login(email:string, password:string ) {
    return this.http.post<any>(this.theUrl, {email, password})
      .pipe(
        map(user => localStorage.setItem('user', JSON.stringify(user))),
        catchError(this.handleError<User>("login"))
      );
  }
  logout() { localStorage.removeItem('user'); }

  getToken(): string | null {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).token :null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logout();
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
