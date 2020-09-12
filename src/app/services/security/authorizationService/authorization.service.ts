import {Injectable} from '@angular/core';
import {HttpApiService} from '../../httpApiService/http-api.service';
import {loginEndpoint, URL} from '../../URL';
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
  }

  public login(username: string, password: string) {
    this.httpApiService.post(URL + loginEndpoint, {username, password}, [])
      .subscribe(
        response => {
          sessionStorage.setItem('jwtToken', response.jwt);
          sessionStorage.setItem('role', response.role);
          sessionStorage.setItem('username', username);
          this.loginSubject.next('succeed');
        },
        error => {
          this.loginSubject.next('failed');
        }
      );
  }

  public logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
