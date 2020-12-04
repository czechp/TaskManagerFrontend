import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTask } from 'src/app/models/SubTask';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-add-task-subtasks',
  templateUrl: './add-task-subtasks.component.html',
  styleUrls: ['./add-task-subtasks.component.css'],
  animations: [fade]

})
export class AddTaskSubtasksComponent implements OnInit {

  @HostListener('keyup.enter',['$event'])
  public addSubTaskListener(event: any){
    this.addSubtask();
  }

  @Output()
  public addSubtaskEmitter = new EventEmitter();

  public subTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.subTaskForm = formBuilder.group(
      {
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
        description: ['', [Validators.maxLength(40)]]
      }
    );
  }

  ngOnInit(): void {
  }

  public addSubtask() {
    if (this.subTaskForm.valid){
      const subtask: SubTask = {title: this.subTaskForm.value.title, description: this.subTaskForm.value.description};
      this.addSubtaskEmitter.emit(subtask);
      this.subTaskForm.reset();
    }
  }

}
