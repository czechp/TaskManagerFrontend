import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-filter-tasks',
  templateUrl: './filter-tasks.component.html',
  styleUrls: ['./filter-tasks.component.css']
})
export class FilterTasksComponent implements OnInit {

  @Input()
  public tasks: Task[] = [];

  @Output()
  public filteredTaskEmitter = new EventEmitter();

  public toDoFilter = false;
  public inProgressFilter = false;
  public doneFilter = false;
  public highPriorityFilter = false;
  public mediumPriorityFilter = false;
  public lowPriorityFilter = false;


  constructor() { }

  public filter(): void {
    let result: Task[] = [];
    const noneStatusFilter = !(this.toDoFilter || this.inProgressFilter || this.doneFilter);
    const nonePriorityFilter = !(this.lowPriorityFilter || this.mediumPriorityFilter || this.highPriorityFilter);

    if (nonePriorityFilter && noneStatusFilter)
      result = this.tasks;
    else {
      result = this.tasks.filter(
        task => 
        (this.toDoFilter && task.taskStatus === 'TODO') ||
        (this.inProgressFilter && task.taskStatus === 'IN_PROGRESS') ||
        (this.doneFilter && task.taskStatus === 'DONE') ||
        (this.lowPriorityFilter && task.taskPriority === 'LOW') ||
        (this.mediumPriorityFilter && task.taskPriority === 'MEDIUM') ||
        (this.highPriorityFilter && task.taskPriority === 'HIGH') 
      );
      console.log(result)
    }
    this.filteredTaskEmitter.emit(result);
  }

  ngOnInit(): void {
  }

}
