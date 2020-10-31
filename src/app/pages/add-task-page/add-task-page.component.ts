import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.css']
})
export class AddTaskPageComponent implements OnInit {
  public statement = '';
  constructor() { }

  public stepperSteps: StepperSteps[] = [
    { stepNumber: 0, completed: false },
    { stepNumber: 1, completed: false },
    { stepNumber: 2, completed: false },
    { stepNumber: 3, completed: false }
  ];

  public currentStep: number;

  public stepperCurrentIndex: number;




  ngOnInit(): void {

  }








}

interface StepperSteps {
  stepNumber: number;
  completed: boolean;
}