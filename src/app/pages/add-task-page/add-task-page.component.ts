import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Goal } from 'src/app/models/Goal';
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
  public currentTask: Task = { appUsers: [] };

  //return to false state
  public stepperSteps: StepperSteps[] = [
    { stepNumber: 0, completed: true },
    { stepNumber: 1, completed: true },
    { stepNumber: 2, completed: true },
    { stepNumber: 3, completed: true }
  ];


  @ViewChild('stepper')
  public stepperRef: MatStepper;

  constructor(
    private httpApiSerivce: HttpApiService
  ) {
  }

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

  public addAppUser(appUserId: number) {
    this.httpApiSerivce.put(taskEndpoint + '/' + this.currentTask.id + '/users/' + appUserId, {}, [])
      .subscribe(
        (next: any) => { this.currentTask = next },
        (error: any) => { this.statement = this.httpApiSerivce.errorStatementHandler(error.status) }
      );
  }

  public getPriority(): string {
    return getPriority(this.currentTask.taskPriority);
  }

  public addGoal(goal: Goal) {
    this.clearStatement();
    this.httpApiSerivce.post(taskEndpoint + '/' + this.currentTask.id + '/goals', goal, [])
      .subscribe(
        (next: any) => { console.log(next) },
        (error: any) => { this.statement = this.httpApiSerivce.errorStatementHandler(error.status) }
      );
  }


  public changeStep(step: number) {
    this.stepperSteps[step - 1].completed = true;
    setTimeout(() => this.stepperRef.selectedIndex = step, 100)

  }

  private clearStatement() {
    this.statement = '';
  }


}

interface StepperSteps {
  stepNumber: number;
  completed: boolean;
}