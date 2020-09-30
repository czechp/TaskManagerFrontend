import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/security/authorizationService/authorization.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  public username: string;
  public loginSubscription: Subscription;
  public isLogged: boolean;


  constructor(
    private authorizationService: AuthorizationService
  ) {
    this.username = '';
    this.loginSubscription = new Subscription();
    this.isLogged = false;
  }

  ngOnInit(): void {
    const sessionStorageUsername = this.authorizationService.getUsername();
    this.isLogged = sessionStorageUsername !== null;
    if (this.isLogged) {
      this.username =  sessionStorageUsername;
    }
    this.loginSubscription = this.authorizationService.getLoginSubscription()
      .subscribe(
        x => {
          if (x === 'succeed') {
            this.isLogged = true;
            this.username = this.authorizationService.getUsername();
          } else {
            this.isLogged = false;
          }

        }
      );
  }


  public logout() {
    this.authorizationService.logout();
  }

  public login(username: string, password: string) {
    this.authorizationService.login(username, password);
  }
}
