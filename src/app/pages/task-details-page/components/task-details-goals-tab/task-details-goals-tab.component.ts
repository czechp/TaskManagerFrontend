import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/Goal';

@Component({
  selector: 'app-task-details-goals-tab',
  templateUrl: './task-details-goals-tab.component.html',
  styleUrls: ['./task-details-goals-tab.component.css']
})
export class TaskDetailsGoalsTabComponent implements OnInit, OnChanges {

  public modified: boolean[] = [];

  @Input()
  public goals: Goal[] = [];

  @Input()
  public isOwner = false;

  public goalFormArray = new FormArray([]);


  constructor(
    private formBuilder: FormBuilder
  ) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.createFormArrayFromData();
  }

  ngOnInit(): void {
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
      )
      this.subscribeForModified();
  }

  private subscribeForModified() {
    this.modified = [];
    for (let i = 0; i < this.goalFormArray.controls.length; i++) {
      this.modified.push(false);
    }
    for (let i = 0; i < this.goalFormArray.controls.length; i++) {
      this.goalFormArray.controls[i].valueChanges
        .subscribe(() => this.modified[i] = true);
    }
  }

}
