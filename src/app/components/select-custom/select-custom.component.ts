import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ViewCustomizerService } from 'src/app/services/viewCustomizer/view-customizer.service';

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
  @ViewChild('select')
  private selectRef: ElementRef;
  @Output()
  public valueEmit = new EventEmitter();
  public value: string;


  constructor(
    private viewCustomizerService: ViewCustomizerService
  ) { }

  ngOnInit(): void {
  }

  public changeValue(value): void {
    this.value = value;
    this.viewCustomizerService.setCorrectColors(this.selectRef);
    this.valueEmit.emit(this.value);
  }

  public isValidated(){
    return this.value !== undefined;
  }





}
