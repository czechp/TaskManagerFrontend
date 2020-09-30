import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ViewCustomizerService } from '../../services/viewCustomizer/view-customizer.service';

@Component({
  selector: 'app-input-text-custom',
  templateUrl: './input-text-custom.component.html',
  styleUrls: ['./input-text-custom.component.css']
})
export class InputTextCustomComponent implements OnInit {

  @ViewChild('inputText')
  public inputText: ElementRef;
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
          this.viewCustomizerService.setDangerColors(this.inputText);
        } else {
          this.viewCustomizerService.setCorrectColors(this.inputText);
        }
      } else {
        this.successIconView = true;
        this.viewCustomizerService.setCorrectColors(this.inputText);
      }
    } else {
      this.viewCustomizerService.setDangerColors(this.inputText);
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


