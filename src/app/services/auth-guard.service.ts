import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  userdata:any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
      if (this.isLoggedIn()) {
        return true;
      }
      // navigate to login page as user is not authenticated
      this.router.navigate(['/signUp']);
      return false;

  }

    public isLoggedIn(): boolean {
     let status = false;
     if (localStorage.hasOwnProperty('userdata')) {
       status = true;
     } else {
       status = false;
     }
     return status;
     }

}
