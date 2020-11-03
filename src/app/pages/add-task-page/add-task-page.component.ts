import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Task } from 'src/app/models/Task';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { taskEndpoint } from 'src/app/services/URL';
import { getPriority } from 'src/app/utilities/priorityOperations';

@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.css']
})
export class AddTaskPageComponent implements OnInit {
  public statement = '';
  public currentIndex = 0;
  public currentTask: Task = {};
  public stepperSteps: StepperSteps[] = [
    { stepNumber: 0, completed: false },
    { stepNumber: 1, completed: false },
    { stepNumber: 2, completed: false },
    { stepNumber: 3, completed: false }
  ];

  @ViewChild('stepper')
  public stepperRef: MatStepper;

  constructor(
    private httpApiSerivce: HttpApiService
  ) { }

  ngOnInit(): void {

  }


  public createTask(task: Task) {
    this.httpApiSerivce.post(taskEndpoint, task, [])
      .subscribe(
        (next: any) => {
          this.currentTask = next;
          this.changeStep(1);
        },
        (error: any) => {
          this.statement = this.httpApiSerivce.errorStatementHandler(error.status);
        },
        () => {
        }
      );
  }

  public getPriority(): string {
    return getPriority(this.currentTask.taskPriority);
  }

  private changeStep(step: number) {
    this.stepperSteps[step - 1].completed = true;
    setTimeout(() => this.stepperRef.selectedIndex = step, 100)

  }



}

interface StepperSteps {
  stepNumber: number;
  completed: boolean;
}