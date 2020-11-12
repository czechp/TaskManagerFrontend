import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SubTask } from 'src/app/models/SubTask';

@Component({
  selector: 'app-task-details-subtasks-tab',
  templateUrl: './task-details-subtasks-tab.component.html',
  styleUrls: ['./task-details-subtasks-tab.component.css']
})
export class TaskDetailsSubtasksTabComponent implements OnInit, OnChanges {

  public modified: boolean[] = [];
  public subtasksFormArray = new FormArray([]);

  @Input()
  public subtasks: SubTask[] = [];

  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  private subtasksArrayToFormArray(){
    for(let subtask of this.subtasks){
      this.subtasksFormArray.push(
        this.formBuilder.group({
          id: [subtask.id, [Validators.required, Validators.min(1)]],
          title: [subtask.title, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
          description: [subtask.description, []],
          taskStatus: [subtask.taskStatus, [Validators.required]],
          progress: [subtask.progress, [Validators.required, Validators.min(0), Validators.max(100)]]
        })
      )
    }
  }

}
