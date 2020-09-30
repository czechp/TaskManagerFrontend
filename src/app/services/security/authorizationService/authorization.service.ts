import { Injectable } from '@angular/core';
import { HttpApiService } from '../../httpApiService/http-api.service';
import { loginEndpoint, usersEndpoint } from '../../URL';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../../../consts/Constants';

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
      this.httpApiService.post(usersEndpoint + loginEndpoint, { username, password }, [])
        .subscribe(
          response => {
            sessionStorage.setItem('jwtToken', response.jwt);
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('username', username);
            this.loginSubject.next('succeed');
            this.router.navigate(['']);
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
    return username.length >= MIN_USERNAME_LENGTH && password.length >= MIN_PASSWORD_LENGTH;
  }

  public getLoginSubscription() {
    return this.loginSubject;
  }

  public isLogged(): boolean {
    return sessionStorage.getItem('jwtToken') !== null;
  }

  public getRole(): string {
    return sessionStorage.getItem('role');
  }

  public getJwtToken(): string {
    return sessionStorage.getItem('jwtToken');
  }

  public isUser():boolean{
    return this.getRole() === 'USER';
  }

  public getUsername():string{
    return sessionStorage.getItem('username');
  }

}
