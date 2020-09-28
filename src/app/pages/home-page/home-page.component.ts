import {Component, OnInit} from '@angular/core';
import {HttpApiService} from '../../services/httpApiService/http-api.service';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations:[
    fade
  ]
})
export class HomePageComponent implements OnInit {
  public testValue;
  public statement = '';
  constructor(private httpApiService: HttpApiService) {
  }

  ngOnInit(): void {
    this.httpApiService.get('', [])
      .subscribe();
  }
}
