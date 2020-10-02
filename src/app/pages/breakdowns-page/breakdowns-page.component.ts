import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';
import { maintenanceTasksEndpoint } from 'src/app/services/URL';
import { fade } from 'src/app/utilities/animations/animations';
import { existsById } from 'src/app/utilities/arrayOperation';
import { timeSortResult } from 'src/app/utilities/timeOperations';

@Component({
  selector: 'app-breakdowns-page',
  templateUrl: './breakdowns-page.component.html',
  styleUrls: ['./breakdowns-page.component.css'],
  animations: [fade]
})
export class BreakdownsPageComponent implements OnInit {
  public statement = '';
  public mode: Mode = Mode.ALL;
  public allMaintenaceTasks: MaintenanceTask[] = [];
  public currentMaintenanceTasks: MaintenanceTask[] = [];
  public subTitle = '';
  public isUser = true;
  private sortMultiplier = 1;

  constructor(
    private httpApiService: HttpApiService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUser = this.authorizationService.isUser();
    this.getMaintenancetasks();
  }

  getMaintenancetasks(): void {
    this.httpApiService.get(maintenanceTasksEndpoint, [])
      .subscribe(
        (next: any) => {
          this.allMaintenaceTasks = next;
          this.setCurrentMaintenacetasksByMode();
          this.sortByStatus();
        }
      );
  }

  deleteMaintenanceTask(id: number) {
    if (existsById(this.allMaintenaceTasks, id)) {
      this.httpApiService.delete(maintenanceTasksEndpoint + '/' + id, [])
        .subscribe(
          (next: any) => {
            this.allMaintenaceTasks = this.allMaintenaceTasks.filter((x: MaintenanceTask) => x.id != id);
            this.setCurrentMaintenacetasksByMode();
          },
          (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
        );
    } else { this.statement = 'Błąd! Taka awaria nie istnieje' }
  }

  public navigateToDetails(id: number):void{
    this.router.navigate(['/breakdown-detail', id]);
  }

  public sortByStatus() {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) => this.sortMultiplier * x1.taskStatus.localeCompare(x2.taskStatus));
    this.toggleSortMultiplier();
  }

  public sortById(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) => this.sortMultiplier * (x1.id - x2.id));
    this.toggleSortMultiplier();

  }

  public sortByTitle(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) => this.sortMultiplier * x1.title.localeCompare(x2.title));
    this.toggleSortMultiplier();
  }

  public sortBySecondName(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) =>
        this.sortMultiplier * x1.maintenanceWorker.secondName.localeCompare(x2.maintenanceWorker.secondName));
    this.toggleSortMultiplier();
  }


  public sortByBreakdownPlace(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) =>
        this.sortMultiplier * x1.breakdownPlace.localeCompare(x2.breakdownPlace));
    this.toggleSortMultiplier();
  }


  public sortByBreakdownMachine(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) =>
        this.sortMultiplier * x1.breakdownMachine.localeCompare(x2.breakdownMachine));
    this.toggleSortMultiplier();
  }


  public sortByRepairMan(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) => {
        if ((x1.repairMan !== null || x1.repairMan !== undefined)
          || (x2.repairMan !== null || x2.repairMan !== undefined)) { return this.sortMultiplier;}

        return this.sortMultiplier * x1.repairMan.username.localeCompare(x2.repairMan.username);
      });
    this.toggleSortMultiplier();
  }

  public sortByCreationDate() {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) => this.sortMultiplier * timeSortResult(x1.creationDate, x2.creationDate));
    this.toggleSortMultiplier();
  }

  public sortByFinishDate(): void {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks
      .sort((x1: MaintenanceTask, x2: MaintenanceTask) => this.sortMultiplier * timeSortResult(x1.finishDate, x2.finishDate));
    this.toggleSortMultiplier();

  }


  public setCurrentMaintenacetasksByMode() {
    switch (this.mode) {
      case Mode.ALL: {
        this.setAllMode();
        break;
      }
      case Mode.TODO: {
        this.setTodoMode();
        break;
      }
      case Mode.IN_PROGRESS: {
        this.setInProgressMode();
        break;
      }
      case Mode.DONE: {
        this.setDoneMode();
        break;
      }
      default: {
        this.currentMaintenanceTasks = this.allMaintenaceTasks;
      }
    }
  }

  public setAllMode() {
    this.currentMaintenanceTasks = this.allMaintenaceTasks;
    this.mode = Mode.ALL;
    this.subTitle = 'Wszystkie';
  }

  public setTodoMode() {
    this.currentMaintenanceTasks = this.allMaintenaceTasks.filter((x: MaintenanceTask) => x.taskStatus === "TODO");
    this.mode = Mode.TODO;
    this.subTitle = this.mode;
  }


  public setInProgressMode() {
    this.currentMaintenanceTasks = this.allMaintenaceTasks.filter((x: MaintenanceTask) => x.taskStatus === "IN_PROGRESS");
    this.mode = Mode.IN_PROGRESS;
    this.subTitle = this.mode;
  }

  public setDoneMode() {
    this.currentMaintenanceTasks = this.allMaintenaceTasks.filter((x: MaintenanceTask) => x.taskStatus === "DONE");
    this.mode = Mode.DONE;
    this.subTitle = this.mode;
  }

  private toggleSortMultiplier() {
    this.sortMultiplier *= -1;
  }
}


enum Mode {
  ALL = 'Wszystkie',
  TODO = 'Do wykonania',
  IN_PROGRESS = 'Aktualne',
  DONE = 'Zakończone'
}
