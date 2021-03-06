import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpApiService } from '../../services/httpApiService/http-api.service';
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../../consts/Constants';
import { ViewCustomizerService } from '../../services/viewCustomizer/view-customizer.service';
import { emailExistenceEndpoint, registerEndpoint, usernameExistenceEndpoint, usersEndpoint } from '../../services/URL';
import { HttpErrorResponse } from '@angular/common/http';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  animations: [fade]
})
export class RegisterPageComponent implements OnInit {
  public usernameValidated = false;
  public passwordValidated = false;
  public passwordConfValidated = false;
  public emailValidated = false;
  public firstNameValidated = false;
  public secondNameValidated = false;

  public statement: string;


  @ViewChild('username')
  public loginInput: ElementRef;

  @ViewChild('password')
  public passwordInput: ElementRef;

  @ViewChild('passwordConf')
  public passwordConfInput: ElementRef;

  @ViewChild('email')
  public emailInput: ElementRef;

  @ViewChild('firstName')
  public firstName: ElementRef;

  @ViewChild('secondName')
  public secondName: ElementRef;

  constructor(
    private httpApiService: HttpApiService,
    private viewCustomizerService: ViewCustomizerService,
  ) {
    this.statement = '';
  }

  ngOnInit(): void {
  }

  public validateUsername(username: string): void {
    this.clearStatement();
    this.viewCustomizerService.resetColors(this.loginInput);
    if (username.length >= MIN_USERNAME_LENGTH) {
      this.httpApiService.head(usersEndpoint + usernameExistenceEndpoint, [{ name: 'username', parameter: username }])
        .subscribe(
          response => {
            this.statement = 'Błąd! Taka nazwa użytkownika już istnieje';
            this.viewCustomizerService.setDangerColors(this.loginInput);
            this.usernameValidated = false;
          },
          error => {
            this.usernameValidated = true;
          }
        );
    } else {
      this.statement = 'Błąd! Login za krótki. Minimum ' + MIN_USERNAME_LENGTH + ' znaków';
      this.viewCustomizerService.setDangerColors(this.loginInput);
      this.usernameValidated = false;
    }
  }

  public validatePassowrd(password: string): void {
    this.clearStatement();
    this.viewCustomizerService.resetColors(this.passwordInput);
    if (password.length < MIN_PASSWORD_LENGTH) {
      this.statement = 'Błąd! Hasło za krótkie. Minumum ' + MIN_PASSWORD_LENGTH + ' znaków';
      this.viewCustomizerService.setDangerColors(this.passwordInput);
      this.passwordValidated = false;
    } else {
      this.passwordValidated = true;
    }
  }

  public validatePasswordEquals(password: string, passwordConf: string): void {
    this.clearStatement();
    this.viewCustomizerService.resetColors(this.passwordConfInput);
    if (password !== passwordConf) {
      this.statement = 'Błąd! Hasła są różne';
      this.viewCustomizerService.setDangerColors(this.passwordConfInput);
      this.passwordConfValidated = false;
    } else {
      this.passwordConfValidated = true;
    }
  }

  public validateEmail(email: string) {
    this.viewCustomizerService.resetColors(this.emailInput);
    // tslint:disable-next-line:max-line-length
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(email)) {
      this.httpApiService.head(usersEndpoint + emailExistenceEndpoint, [{ name: 'email', parameter: email }])
        .subscribe(
          (next: any) => {
            this.viewCustomizerService.setDangerColors(this.emailInput);
            this.statement = 'Błąd! Taki email jest już wykorzystany.';
            this.emailValidated = false;
          },
          (error: any) => {
            this.emailValidated = true;
          }
        );
    } else {
      this.emailValidated = false;
      this.viewCustomizerService.setDangerColors(this.emailInput);
      this.statement = 'Błąd! Nieporawny format adresu email';
    }
  }

  public validateFirstName(firstName: string) {
    this.firstNameValidated = firstName.length >= 3;
  }


  public validateSecondName(secondName: string) {
    this.secondNameValidated = secondName.length >= 3;
  }


  public checkValidation(): boolean {
    return this.usernameValidated
      && this.passwordValidated
      && this.passwordConfValidated
      && this.emailValidated
      && this.firstNameValidated
      && this.secondNameValidated;
  }

  public register(username: string, password: string, email: string, firstName: string, secondName: string) {
    this.clearStatement();
    if (this.checkValidation()) {
      this.httpApiService.post(usersEndpoint + registerEndpoint,
        { username: username, password: password, email: email, firstName: firstName, secondName: secondName }, [])
        .subscribe(
          (next: any) => {
            this.statement = 'Sukces! Sprawdź email i czekaj na akceptacje przez administratora';
          },
          (error: HttpErrorResponse) => {
            this.statement = this.httpApiService.errorStatementHandler(error.status);
          }
        );
    } else {
      this.statement = 'Błąd! Sprawdź poprawność danych';
    }
  }

  private clearStatement(): void {
    this.statement = '';
  }

}
