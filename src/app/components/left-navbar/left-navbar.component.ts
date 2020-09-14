import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthorizationService} from '../../services/security/authorizationService/authorization.service';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.css']
})
export class LeftNavbarComponent implements OnInit {
  public isLogged: boolean;
  private loginSubscription: Subscription;

  constructor(
    private authorizationService: AuthorizationService
  ) {
    this.loginSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.isLogged = sessionStorage.getItem('username') !== null;
    this.loginSubscription = this.authorizationService.getLoginSubscription()
      .subscribe(
        x => {
          this.isLogged = x === 'succeed';
        }
      );
  }

  logout() {
    this.authorizationService.logout();
  }
}
