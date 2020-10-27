import { Component, OnInit } from '@angular/core';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { MaintenanceWorker } from 'src/app/models/MaintenanceWorker';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { maintenanceTasksEndpoint, maintenanceWorkersEndpoint, usersEndpoint } from 'src/app/services/URL';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-report-breakdown-page',
  templateUrl: './report-breakdown-page.component.html',
  styleUrls: ['./report-breakdown-page.component.css'],
  animations: [fade]
})
export class ReportBreakdownPageComponent implements OnInit {
  public readonly BREAKDONW_PLACE_MIN_LENGTH = 1;
  public readonly DESCRIPTION_MIN_LENGTH = 3;
  public readonly TITLE_MIN_LENGTH = 3;
  public readonly BREAKDOWN_MACHINE_MIN_LENGTH = 3;

  public statement = '';
  public maintenaceTask: MaintenanceTask = {};
  public maintenanceWorkers: MaintenanceWorker[] = [];
  public maintenanceWorkersName: string[];

  constructor(
    private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.getMaintenanceWorkers();
  }

  public getMaintenanceWorkerFromSelect(result: string) {
    const names = result.split(' ');
    for (let worker of this.maintenanceWorkers) {
      if (worker.firstName === names[0] && worker.secondName === names[1]) {
        this.maintenaceTask.maintenanceWorker = worker;
      }
    }

    if (this.maintenaceTask.maintenanceWorker === undefined) { this.statement = 'Błąd! Taki pracownik UR nie istnieje' }
  }

  public saveMaintenanceTask() {
    this.httpApiService.post(maintenanceTasksEndpoint, this.maintenaceTask, [])
      .subscribe(
        (next: any) => { },
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status); }
      );
  }




  private getMaintenanceWorkers() {
    this.httpApiService.get(maintenanceWorkersEndpoint, [])
      .subscribe(
        (next: any) => {
          this.maintenanceWorkers = next.sort((x1: MaintenanceWorker, x2: MaintenanceWorker) => x1.firstName.localeCompare(x2.firstName));
          this.setMaintenanceWorkersName();
        },
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(error.status);
        }
      );
  }

  private setMaintenanceWorkersName() {
    this.maintenanceWorkersName = this.maintenanceWorkers
      .map(
        (x: MaintenanceWorker) => x.firstName + ' ' + x.secondName
      )
  }
}
