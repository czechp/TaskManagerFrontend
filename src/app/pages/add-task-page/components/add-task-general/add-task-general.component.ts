import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Task } from 'src/app/models/Task';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-add-task-general',
  templateUrl: './add-task-general.component.html',
  styleUrls: ['./add-task-general.component.css'],
  animations: [fade]
})
export class AddTaskGeneralComponent implements OnInit {

  public taskForm: any;

  @Output()
  public createTaskEmitter = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group(
      {
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: [''],
        priority: ['',[Validators.required]]
      }
    );
  }

  ngOnInit(): void {
  }

  test(){
    console.log(this.taskForm.value.priority)
  }

  public createTask() {
    const task: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      taskPriority: this.taskForm.value.priority
    }

    this.createTaskEmitter.emit(task);
  }



}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}