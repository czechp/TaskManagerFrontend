import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorizationService/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authorizationService.getRole() === 'ADMIN' || this.authorizationService.getRole() ==='SUPERUSER'){return true};

    this.router.navigate(['/forbidden']);
    return false;
  }
}
