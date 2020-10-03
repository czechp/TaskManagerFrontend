import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ViewCustomizerService } from 'src/app/services/viewCustomizer/view-customizer.service';

@Component({
  selector: 'app-input-text-area-custom',
  templateUrl: './input-text-area-custom.component.html',
  styleUrls: ['./input-text-area-custom.component.css']
})
export class InputTextAreaCustomComponent implements OnInit, OnChanges {


  @ViewChild('inputTextArea')
  public inputTextArea: ElementRef;
  @Input()
  public title: string;

  @Input()
  public length: number;

  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter();

  public validationInfoVisibility: boolean;
  public successIconView: boolean;

  constructor(
    private viewCustomizerService: ViewCustomizerService
  ) {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.value===null || this.value === undefined){this.valueChange.emit('');  this.value=''}
  }


  ngOnInit(): void {
  }

  public onKeyUpEvent() {
    this.valueChange.emit(this.value);
  }

  public focusOutEvent() {
    if (this.value !== undefined) {
      if (this.length !== undefined) {
        this.validationInfoVisibility = this.value.length < this.length;
        this.successIconView = !this.validationInfoVisibility;
        if (this.validationInfoVisibility) {
          this.viewCustomizerService.setDangerColors(this.inputTextArea);
        } else {
          this.viewCustomizerService.setCorrectColors(this.inputTextArea);
        }
      } else {
        this.successIconView = true;
        this.viewCustomizerService.setCorrectColors(this.inputTextArea);
      }
    } else {
      this.viewCustomizerService.setDangerColors(this.inputTextArea);
      this.validationInfoVisibility = true;
    }
  }

  public isValidated(): boolean {
    if (this.value !== undefined) {
      if (this.length !== undefined) {
        return this.value.length >= this.length;
      } else {
        return true;
      }
    }
    else {
      return false;
    }
  }
}
