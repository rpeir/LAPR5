import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { state } from "@angular/animations";
import { boolean } from "joi";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VerifyAuthService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // check If the user is logged in
    if (localStorage.getItem("user")) {
      return true;
    }
    //not logged in so redirect to login page
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }


}
