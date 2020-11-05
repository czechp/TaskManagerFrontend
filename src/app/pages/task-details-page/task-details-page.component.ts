import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { Task } from 'src/app/models/Task';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';
import { taskEndpoint } from 'src/app/services/URL';

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.css']
})
export class TaskDetailsPageComponent implements OnInit {
  private taskId = 0;
  public statement = '';
  public isOwner = false;
  public task: Task = { appUsers: [], goals: [], subTasks: [] }

  constructor(
    private activeRoute: ActivatedRoute,
    private httpApiService: HttpApiService,
    private authorizationService: AuthorizationService
  ) {
    this.taskId = activeRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getTask();
  }

  private getTask() {
    this.clearStatement();
    this.httpApiService.get(taskEndpoint + '/' + this.taskId, [])
      .subscribe(
        (next: any) => { this.task = next; this.isOwner = this.areYouOwner(); console.log(this.isOwner) },
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
      );
  }
  
  private areYouOwner():boolean{
      const isAmongParticipants = this.task.appUsers
      .map((x: AppUser)=>x.username)
      .filter((x: string)=>x === this.authorizationService.getUsername())
      .length > 0;

    const currentUserRole = this.authorizationService.getRole();

    const isAdminOrDirectorOrSuperUser = currentUserRole === 'ADMIN'
    || currentUserRole === 'SUPERUSER'
    || currentUserRole === 'DIRECTOR';

    return isAmongParticipants || isAdminOrDirectorOrSuperUser;
  }
  private clearStatement() { this.statement = ''; }
  
}
