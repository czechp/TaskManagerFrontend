import {Injectable} from '@angular/core';
import {HttpApiService} from '../../httpApiService/http-api.service';
import {loginEndpoint} from '../../URL';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public loginSubject: Subject<any>;

  constructor(
    private httpApiService: HttpApiService,
    private router: Router
  ) {
    this.loginSubject = new Subject<any>();
  }

  public login(username: string, password: string) {
    if (this.validateUsernameAndPassword(username, password)) {
      this.httpApiService.post(loginEndpoint, {username, password}, [])
        .subscribe(
          response => {
            sessionStorage.setItem('jwtToken', response.jwt);
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('username', username);
            this.loginSubject.next('succeed');
            // todo: Router to main page
          },
          error => {
            this.loginSubject.next('failed');
          }
        );
    } else {
      this.loginSubject.next('incorrect');
    }
  }

  public logout(): void {
    sessionStorage.clear();
    this.loginSubject.next('logout');
    this.router.navigate(['/login']);
  }

  public validateUsernameAndPassword(username: string, password: string): boolean {
    // todo: change it after test
    return username.length >= 4 && password.length >= 4;
  }

  public getLoginSubscription() {
    return this.loginSubject;
  }

}
