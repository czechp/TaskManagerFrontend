import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { AuthorizationService } from 'src/app/services/security/authorizationService/authorization.service';
import { maintenanceTasksEndpoint } from 'src/app/services/URL';
import { fade } from 'src/app/utilities/animations/animations';
import { existsById } from 'src/app/utilities/arrayOperation';

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

  constructor(
    private httpApiService: HttpApiService,
    private authorizationService: AuthorizationService
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
    } else { this.statement = "Błąd! Taka awaria nie istnieje" }
  }

  public sortByStatus() {
    this.currentMaintenanceTasks = this.currentMaintenanceTasks.sort((x1: MaintenanceTask, x2: MaintenanceTask) => x1.taskStatus.localeCompare(x2.taskStatus));
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
        this.setInProgressMode()
        break;
      }
      case Mode.DONE: {
        this.setDoneMode;
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
}

enum Mode {
  ALL = 'Wszystkie',
  TODO = 'Do wykonania',
  IN_PROGRESS = 'Aktualne',
  DONE = 'Zakończone'
}
