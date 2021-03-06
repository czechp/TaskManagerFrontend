import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { MaintenanceWorker } from 'src/app/models/MaintenanceWorker';
import { fade, slideOut } from 'src/app/utilities/animations/animations';
import { maintenanceWorkersEndpoint } from 'src/app/services/URL';
import { deleteFromArray, existsById, getElementById } from 'src/app/utilities/arrayOperation';
import { validationStatementHandler } from 'src/app/utilities/StatementHandler';
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';

@Component({
  selector: 'app-maintenance-workers',
  templateUrl: './maintenance-workers-page.component.html',
  styleUrls: ['./maintenance-workers-page.component.css'],
  animations: [fade, slideOut]
})
export class MaintenanceWorkersPageComponent implements OnInit {
  public statement = '';
  public maintenanceWorkers: MaintenanceWorker[] = [];
  public newMaintenanceWorker: MaintenanceWorker = {};
  public readonly FIRST_NAME_MIN_LENGTH = 3;
  public readonly SECOND_NAME_MIN_LENGTH = 3;
  public isUser = true;



  constructor(
    private httpApiService: HttpApiService,
    private authorizationService: AuthorizationService
  ) { }


  ngOnInit(): void {
    this.getMaintenanceWorkers();
    this.isUser = this.authorizationService.isUser();
  }

  private getMaintenanceWorkers() {
    this.httpApiService.get(maintenanceWorkersEndpoint, [])
      .subscribe(
        (next: any) => {
          this.maintenanceWorkers = next;
          this.sortByFirstName();
        },
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(error.status);
        }
      )
  }

  public modifyMaintenanceWorker(id: number, validated: boolean) {
    const maintenanceWorker = getElementById(this.maintenanceWorkers, id);
    if (maintenanceWorker !== null && validated) {
      this.httpApiService.put(maintenanceWorkersEndpoint + '/' + id, maintenanceWorker, [])
        .subscribe(
          (next: any) => { },
          (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
        );
    } else {
      this.statement = validationStatementHandler(maintenanceWorker, validated);
    }
  }

  public delete(id: number) {
    if (existsById(this.maintenanceWorkers, id)) {
      this.httpApiService.delete(maintenanceWorkersEndpoint + '/' + id, [])
        .subscribe(
          (next: any) => { this.maintenanceWorkers = this.maintenanceWorkers.filter(x => x.id !== id) },
          (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
        );

    } else {
      this.statement = validationStatementHandler(null, true);
    }
  }

  public createNewMaintenanceWorker() {
    this.httpApiService.post(maintenanceWorkersEndpoint, this.newMaintenanceWorker, [])
      .subscribe(
        (next: any) => { this.getMaintenanceWorkers(); },
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status); }
      );
  }

  public sortByFirstName() {
    this.maintenanceWorkers = this.maintenanceWorkers.sort((x1: MaintenanceWorker, x2: MaintenanceWorker) =>
      x1.firstName.localeCompare(x2.firstName));
  }

  public sortBySecondName() {
    this.maintenanceWorkers = this.maintenanceWorkers.sort((x1: MaintenanceWorker, x2: MaintenanceWorker) =>
      x1.secondName.localeCompare(x2.secondName));
  }

  public sortById() {
    this.maintenanceWorkers = this.maintenanceWorkers.sort((x1: MaintenanceWorker, x2: MaintenanceWorker) => x1.id - x2.id);
  }

  // todo: Implement it
  public sortByBreakdownsNumber() { }

}
