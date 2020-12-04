import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { getPriority } from 'src/app/utilities/priorityOperations';
import { statusToString } from 'src/app/utilities/statusOperation';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnChanges {

  public columnsDisplayed = ['id', 'title', 'taskStatus', 'taskPriority', 'progress', 'appUsers'];
  
  public tasksDataSource;

  @Input()
  public tasks: Task[] = [];


  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.tasksDataSource = new MatTableDataSource(this.tasks);
    this.tasksDataSource.sort = this.sort;
  }

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
