import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { fade } from 'src/app/utilities/animations/animations';


@Component({
  selector: 'app-task-details-general-tab',
  templateUrl: './task-details-general-tab.component.html',
  styleUrls: ['./task-details-general-tab.component.css'],
  animations: [fade]
})
export class TaskDetailsGeneralTabComponent implements OnInit, OnChanges {

  public modified = false;

  @Input()
  public isOwner = false;
  @Input()
  public task: Task = {};
  @Output()
  public taskChange = new EventEmitter();
  @Output()
  public updateTaskEmitter = new EventEmitter()

  public taskGeneralForm: FormGroup;
  public changesSubscription;

  constructor(private formBuilder: FormBuilder) {
    this.taskGeneralForm = formBuilder.group(
      {
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
        description: ['', [Validators.maxLength(255)]],
        taskPriority: ['', [Validators.required]],
        taskStatus: ['', Validators.required]
      }
    );
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.changesSubscription !== undefined) { this.changesSubscription.unsubscribe(); }
    this.dataToForm();
    this.dataChanged();
  }

  ngOnInit(): void {
  }

  public updateTask() {
    this.formToData();
    this.taskChange.emit(this.task);
    this.updateTaskEmitter.emit();
  }

  private dataToForm() {
    this.taskGeneralForm.get('title').setValue(this.task.title);
    this.taskGeneralForm.get('description').setValue(this.task.description);
    this.taskGeneralForm.get('taskPriority').setValue(this.task.taskPriority);
    this.taskGeneralForm.get('taskStatus').setValue(this.task.taskStatus);

  }

  private formToData() {
    this.task.title = this.taskGeneralForm.value.title;
    this.task.description = this.taskGeneralForm.value.description;
    this.task.taskPriority = this.taskGeneralForm.value.taskPriority;
    this.task.taskStatus = this.taskGeneralForm.value.taskStatus;
  }

  private dataChanged() {
    this.changesSubscription = this.taskGeneralForm.valueChanges
      .subscribe(() => this.modified = true);
  }

}
