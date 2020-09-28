import {Component, OnInit} from '@angular/core';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-forbiden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.css'],
  animations: [fade]
})
export class ForbiddenPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
