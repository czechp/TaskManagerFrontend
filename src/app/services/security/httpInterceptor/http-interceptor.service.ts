import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
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
        catchError(error => {
          return this.handleError(error);
        })
      )
      :
      next.handle(req);
  }

  private handleError(response: any) {
    if (!(response instanceof HttpResponse)) {
        console.log('works');
    }
    return throwError(response);

  }
}
