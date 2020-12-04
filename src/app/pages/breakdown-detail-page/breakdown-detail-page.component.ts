import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/models/AppUser';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';
import { maintenanceTasksEndpoint, maintenanceWorkersEndpoint } from 'src/app/services/URL';
import { AppUsersService } from 'src/app/services/users/app-users.service';
import { fade } from 'src/app/utilities/animations/animations';
import { statusToString } from 'src/app/utilities/statusOperation';

@Component({
  selector: 'app-breakdown-detail-page',
  templateUrl: './breakdown-detail-page.component.html',
  styleUrls: ['./breakdown-detail-page.component.css'],
  animations: [fade]
})
export class BreakdownDetailPageComponent implements OnInit {

  private id: number;
  public currentAppUser:AppUser = {};
  public statement = '';
  public maintenanceTask: MaintenanceTask = {maintenanceWorker: {}, repairMan: {}};


  constructor(
    private activetedRoute: ActivatedRoute,
    private httpApiService: HttpApiService,
    private appUsersService: AppUsersService
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getMaintenanceTask();
    });
    this.appUsersService.getCurrentUser()
    .subscribe(
      (next: any)=>this.currentAppUser = next,
      (error: any)=>this.statement = this.httpApiService.errorStatementHandler(error.status)
    );
  }
  

  private getMaintenanceTask(): void {
    this.httpApiService.get(maintenanceTasksEndpoint + '/' + this.id, [])
      .subscribe(
        (next: any) => this.maintenanceTask = next,
        (error: any) => this.statement = this.httpApiService.errorStatementHandler(error.status)
      );
  }

  public getStatus(): string {
    return statusToString(this.maintenanceTask.taskStatus);
  }

  public changeStatusToInProgress(){
    this.maintenanceTask.taskStatus = 'IN_PROGRESS';
    this.httpApiService.put(maintenanceTasksEndpoint + '/' + this.id, this.maintenanceTask, [])
    .subscribe(
      (next: any)=>this.getMaintenanceTask(),
      (error: any)=>this.statement = this.httpApiService.errorStatementHandler(error.status)
    );
  }

  public finishMaintenanceTask(){
    this.maintenanceTask.taskStatus = "DONE";
    this.maintenanceTask.repairMan = this.currentAppUser;
    this.httpApiService.put(maintenanceTasksEndpoint + '/' + this.id, this.maintenanceTask, [])
    .subscribe(
      (next: any)=>this.getMaintenanceTask(),
      (error: any)=>this.statement = this.httpApiService.errorStatementHandler(error.status)
    );

  }


}
