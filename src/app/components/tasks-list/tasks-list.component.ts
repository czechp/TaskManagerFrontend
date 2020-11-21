import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { getPriority } from 'src/app/utilities/priorityOperations';
import { statusToString } from 'src/app/utilities/statusOperation';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  @Input()
  public tasks: Task[] = [];

  public columnsDisplayed = ['id', 'title', 'status', 'priority', 'progress', 'workers'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getStatus(status: string):string{
    return statusToString(status);
  }

  public getPriority(priority: string):string{
    return  getPriority(priority);
  }

  public navigateToTaskDetails(taskId: number){
    this.router.navigate(['/task-details', taskId]);
  }

}
