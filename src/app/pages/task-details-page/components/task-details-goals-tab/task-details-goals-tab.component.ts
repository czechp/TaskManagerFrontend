import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Goal } from 'src/app/models/Goal';
import { fade } from 'src/app/utilities/animations/animations';
import { TaskDetailsDeleteGoalDialogComponent } from './dialogs/task-details-delete-goal-dialog/task-details-delete-goal-dialog.component';

@Component({
  selector: 'app-task-details-goals-tab',
  templateUrl: './task-details-goals-tab.component.html',
  styleUrls: ['./task-details-goals-tab.component.css'],
  animations: [fade]
})
export class TaskDetailsGoalsTabComponent implements OnInit, OnChanges {

  public modified: boolean[] = [];

  @Input()
  public goals: Goal[] = [];

  @Input()
  public isOwner = false;

  @Output()
  public deleteGoalEmitter = new EventEmitter();

  @Output()
  public modifyGoalEmitter = new EventEmitter();

  public goalFormArray = new FormArray([]);


  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.createFormArrayFromData();
  }

  ngOnInit(): void {
  }

  public deleteGoalDialog(goalForm: FormGroup) {
    const dialogRef = this.matDialog.open
      (TaskDetailsDeleteGoalDialogComponent,
        {
          width: '600px',
          data: goalForm.value.content
        });

    dialogRef.afterClosed()
      .subscribe((x: string) => {
        if (x === 'true') {
          this.deleteGoal(goalForm.value.id);
        }
      });
  }

  public deleteGoal(goalId: number) {
    this.deleteGoalEmitter.emit(goalId);
  }

  public modifyGoal(goalForm: FormGroup) {
    if (goalForm.valid) {
      this.modifyGoalEmitter.emit(this.goalFormToGoal(goalForm));
    }
  }

  private createFormArrayFromData(): void {
    this.goalFormArray.clear();
    this.goals
      .forEach(
        (x: Goal) => {
          this.goalFormArray.push(
            this.formBuilder.group({
              id: [x.id, [Validators.required]],
              content: [x.content, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]]
            })
          )
        }
      );
    this.subscribeForModified();
  }

  private subscribeForModified() {
    this.modified = [];
    for (const item of this.goalFormArray.controls) {
      this.modified.push(false);
    }
    for (let i = 0; i < this.goalFormArray.controls.length; i++) {
      this.goalFormArray.controls[i].valueChanges
        .subscribe(() => this.modified[i] = true);
    }
  }

  private goalFormToGoal(goalForm: FormGroup): Goal {
    return { id: goalForm.value.id, content: goalForm.value.content };
  }

}
