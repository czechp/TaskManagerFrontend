import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { MaintenanceWorker } from 'src/app/models/MaintenanceWorker';
import { fade } from 'src/app/utilities/animations/animations';
import { maintenanceWorkersEndpoint } from 'src/app/services/URL';

@Component({
  selector: 'app-maintenance-workers',
  templateUrl: './maintenance-workers.component.html',
  styleUrls: ['./maintenance-workers.component.css'],
  animations: [fade]
})
export class MaintenanceWorkersComponent implements OnInit {
  public statement = '';
  public maintenanceWorkers: MaintenanceWorker[] = [];


  constructor(
    private httpApiService: HttpApiService
  ) { }


  ngOnInit(): void {
    this.getMaintenanceWorkers();
  }

  private getMaintenanceWorkers(){
    this.httpApiService.get(maintenanceWorkersEndpoint,[])
    .subscribe(
      (next: any)=>{
        console.log(next);
        this.maintenanceWorkers = next;
        this.sortByFirstName();
      },
      (error: any)=>{
        this.statement = this.httpApiService.errorStatementHandler(error.status);
      }
    )
  }

  public sortByFirstName(){
    this.maintenanceWorkers = this.maintenanceWorkers.sort((x1: MaintenanceWorker, x2: MaintenanceWorker)=>x1.firstName.localeCompare(x2.firstName));
  }

}
