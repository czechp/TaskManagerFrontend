import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../services/security/authorizationService/authorization.service';
import {HttpApiService} from '../../services/httpApiService/http-api.service';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations:[fade]
})
export class LoginPageComponent implements OnInit {
  public statement: string;

  constructor(
    private authorizationService: AuthorizationService,
    private httpApiService: HttpApiService
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
