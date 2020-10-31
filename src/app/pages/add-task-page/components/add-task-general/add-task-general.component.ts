import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-add-task-general',
  templateUrl: './add-task-general.component.html',
  styleUrls: ['./add-task-general.component.css']
})
export class AddTaskGeneralComponent implements OnInit {

  public taskNameFormControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(5)

    ]
  );

  public taskNameInputValidator = new MyErrorStateMatcher();


  constructor() { }

  ngOnInit(): void {
  }

  

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}