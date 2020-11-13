import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTask } from 'src/app/models/SubTask';
import { fade } from 'src/app/utilities/animations/animations';
import { statusToString } from 'src/app/utilities/statusOperation';

@Component({
  selector: 'app-task-details-subtasks-tab',
  templateUrl: './task-details-subtasks-tab.component.html',
  styleUrls: ['./task-details-subtasks-tab.component.css'],
  animations: [fade]
})
export class TaskDetailsSubtasksTabComponent implements OnInit, OnChanges {

  public modified: boolean[] = [];
  public subtasksFormArray = new FormArray([]);

  @Input()
  public subtasks: SubTask[] = [];

  @Input()
  public isOwner: boolean;

  @Output()
  public modifySubtaskEmitter = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.subtasksArrayToFormArray();
    this.subscribeToModify();
  }

  ngOnInit(): void {
  }

  public getStatus(status: string): string {
    return statusToString(status);
  }

  public modifySubtask(subtaskForm: FormGroup, index: number) {
    if (subtaskForm.valid) {
      let subtask = this.subtasks[index];
      subtask.title = subtaskForm.value.title;
      subtask.description = subtaskForm.value.description;
      subtask.taskStatus = subtaskForm.value.taskStatus;
      subtask.progress = subtaskForm.value.progress
      this.modifySubtaskEmitter.emit(subtask);
    }
  }

  private subtasksArrayToFormArray() {
    for (const subtask of this.subtasks) {
      this.subtasksFormArray.push(
        this.formBuilder.group({
          id: [subtask.id, [Validators.required, Validators.min(1)]],
          title: [subtask.title, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
          description: [subtask.description, [Validators.maxLength(255)]],
          taskStatus: [subtask.taskStatus, [Validators.required]],
          progress: [subtask.progress, [Validators.required, Validators.min(0), Validators.max(100)]]
        })
      );
    }
  }

  private subscribeToModify() {
    this.modified = new Array<boolean>(this.subtasks.length);
    this.subtasksFormArray.controls.forEach(
      (value, index) => {
        value.valueChanges.subscribe(() => {
          this.modified[index] = true;
        });
      }
    );
  }
}
