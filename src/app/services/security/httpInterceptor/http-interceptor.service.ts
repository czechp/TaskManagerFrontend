import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    return jwtToken !== null ?
      next.handle(req.clone({
        setHeaders: {Authorization: 'Bearer ' + jwtToken}
      })).pipe(
        catchError(err => this.handleError(err))
      )
      :
      next.handle(req);
  }

  private handleError(error: any) {
    console.log(error.status);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.router.navigate(['/login']);
      }
    }
    return throwError(error);
  }
}
