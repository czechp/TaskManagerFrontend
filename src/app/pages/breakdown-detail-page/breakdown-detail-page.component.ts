import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { maintenanceTasksEndpoint, maintenanceWorkersEndpoint } from 'src/app/services/URL';
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
  public statement = '';
  public maintenanceTask: MaintenanceTask = {maintenanceWorker: {}, repairMan: {}};

  constructor(
    private activetedRoute: ActivatedRoute,
    private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getMaintenanceTask();
    });

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
}
