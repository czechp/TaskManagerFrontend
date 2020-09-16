import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpApiService} from '../../services/httpApiService/http-api.service';
import {MIN_USERNAME_LENGTH} from '../../consts/Constants';
import {ViewCustomizerService} from '../../services/viewCustomizer/view-customizer.service';
import {usernameExistenceEndpoint, usersEndpoint} from '../../services/URL';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  public statement: string;

  @ViewChild('username')
  public loginInput: ElementRef;

  constructor(
    private httpApiService: HttpApiService,
    private viewCustomizerService: ViewCustomizerService,
  ) {
    this.statement = '';
  }

  ngOnInit(): void {
  }

  public validateUsername(username: string) {
    this.clearStatement();
    this.viewCustomizerService.resetColors(this.loginInput);
    if (username.length >= MIN_USERNAME_LENGTH) {
      this.httpApiService.head(usersEndpoint + usernameExistenceEndpoint, [{name: 'username', parameter: username}])
        .subscribe(
          response => {
            this.statement = 'Błąd! Taka nazwa użytkownika już istnieje';
            this.viewCustomizerService.setDangerColors(this.loginInput);
          },
          error => {
          }
        );
    } else {
      this.statement = 'Błąd! Login za krótki';
      this.viewCustomizerService.setDangerColors(this.loginInput);
    }
  }

  private clearStatement(): void {
    this.statement = '';
  }


}
