import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthorizationService} from '../../services/security/authorizationService/authorization.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {
  @Input()
  public statement: string;
  public loginSubscription: Subscription;

  constructor(
    private authorizationService: AuthorizationService
  ) {
    this.loginSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.loginSubscription = this.authorizationService.getLoginSubscription()
      .subscribe(
        x => {
          if (x === 'failed') {
            this.statement = 'Błąd! Niepoprawne dane logowania';
          } else if (x === 'incorrect') {
            this.statement = 'Błąd! Login lub hasło za krótkie';
          }
        }
      );
  }

}
