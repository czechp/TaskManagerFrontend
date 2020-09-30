import { Component, OnInit } from '@angular/core';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { MaintenanceWorker } from 'src/app/models/MaintenanceWorker';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { maintenanceWorkersEndpoint, usersEndpoint } from 'src/app/services/URL';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-report-breakdown-page',
  templateUrl: './report-breakdown-page.component.html',
  styleUrls: ['./report-breakdown-page.component.css'],
  animations: [fade]
})
export class ReportBreakdownPageComponent implements OnInit {
  public readonly REPAIR_PLACE_MIN_LENGTH = 3;
  public readonly DESCRIPTION_MIN_LENGTH = 3;

  public statement = '';
  public maintenaceTask: MaintenanceTask = {};
  public maintenanceWorkers: MaintenanceWorker[] = [];

  constructor(
    private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(){
    this.httpApiService.get(maintenanceWorkersEndpoint, [])
    .subscribe(
      (next: any)=>{this.maintenanceWorkers = next.sort((x1:MaintenanceWorker, x2:MaintenanceWorker)=>x1.firstName.localeCompare(x2.firstName))},
      (error: any)=>{
        this.statement = this.httpApiService.errorStatementHandler(error.status);
      }
    );
    
  }

}
