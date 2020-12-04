import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { taskEndpoint } from 'src/app/services/URL';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-all-tasks-page',
  templateUrl: './all-tasks-page.component.html',
  styleUrls: ['./all-tasks-page.component.css'],
  animations: [fade]
})
export class AllTasksPageComponent implements OnInit {

  public tasks: Task[] = [];
  public tasksAfterFilter: Task[] = [];
  public statement = '';

  constructor(
    private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getFilteredTasks(tasks: Task[]) {
    this.tasksAfterFilter = tasks;
    console.log(this.tasksAfterFilter);
  }

  private getTasks() {
    this.clearStatement();
    this.httpApiService.get(taskEndpoint, [])
      .subscribe(
        (next: any) => { this.tasks = this.sortTasks(next); this.tasksAfterFilter = this.tasks },
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status); }
      );
  }

  private clearStatement(): void {
    this.statement = '';
  }

  private sortTasks(tasks: Task[]) {
    return tasks.sort((x1: Task, x2: Task) => x1.id - x2.id);
  }
}
