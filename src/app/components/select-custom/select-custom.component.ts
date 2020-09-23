import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.css']
})
export class SelectCustomComponent implements OnInit {

  @Input()
  public values: string[];
  @Input()
  public title: string;
  @Input()
  public placeholder: string;

  public value: string;


  constructor() { }

  ngOnInit(): void {
  }

  public changeValue(value): void {
    this.value = value;
  }






}