import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/security/authorizationService/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public statement: string;

  constructor(
    private authorizationService: AuthorizationService
  ) {
    this.statement = '';
  }

  ngOnInit(): void {

  }

  public login(username: string, password: string) {
    this.clearStatement();
    this.authorizationService.login(username, password);
  }

  private clearStatement() {
    this.statement = '';
  }
}
