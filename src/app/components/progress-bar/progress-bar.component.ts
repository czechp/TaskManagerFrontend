import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {

  @Input()
  public value: number;

  @Input()
  public title: string;

  public color = 'warn';

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.color = this.value <= 30 ? 'warn' : 'primary';
  }


  ngOnInit(): void {
  }

}
