import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {
  @Input()
  public statement: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
