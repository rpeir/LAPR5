import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import { inject } from "@angular/core";

export const taskManagerGuard: CanActivateFn = (route, state) => {
  const autorized = inject(AuthService).isTaskManager();
  if (!autorized) {
    inject(Router).navigate(["/login"]);
  }
  return autorized;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const autorized = inject(AuthService).isAdmin();
  if (!autorized) {
    inject(Router).navigate(["/login"]);
  }
  return autorized;
};

export const userGuard: CanActivateFn = (route, state) => {
  const autorized = inject(AuthService).isUser();
  if (!autorized) {
    inject(Router).navigate(["/login"]);
  }
  return autorized;
};

export const fleetManagerGuard: CanActivateFn = (route, state) => {
  const autorized = inject(AuthService).isFleetManager();
  if (!autorized) {
    inject(Router).navigate(["/login"]);
  }
  return autorized;
};

export const campusManagerGuard: CanActivateFn = (route, state) => {
  const autorized = inject(AuthService).isCampusManager();
  if (!autorized) {
    inject(Router).navigate(["/login"]);
  }
  return autorized;
}


