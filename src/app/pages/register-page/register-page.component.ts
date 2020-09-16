import {Component, OnInit} from '@angular/core';
import {HttpApiService} from '../../services/httpApiService/http-api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  public statement: string;

  constructor(
    private httpApiService: HttpApiService
  ) {
    this.statement = '';
  }

  ngOnInit(): void {
  }

}
