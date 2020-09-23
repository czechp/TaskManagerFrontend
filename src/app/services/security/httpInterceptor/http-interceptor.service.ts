import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorizationService/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authorizationService.isLogged() ?
      next.handle(req.clone({
        setHeaders: { Authorization: 'Bearer ' + this.authorizationService.getJwtToken() }
      })).pipe(
        catchError(error => {
          return this.handleError(error);
        })
      )
      :
      next.handle(req);
  }

  private handleError(error: any) {
    if (error.status === 403 || error.status === 401) {
      this.authorizationService.logout();
    }
    return throwError(error);

  }
}
