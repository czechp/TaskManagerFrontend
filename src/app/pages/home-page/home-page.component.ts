import {Component, OnInit} from '@angular/core';
import {HttpApiService} from '../../services/httpApiService/http-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private httpApiService: HttpApiService) {
  }

  ngOnInit(): void {
    this.httpApiService.get('', [])
      .subscribe();
  }
}
