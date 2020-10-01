import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { maintenanceTasksEndpoint } from 'src/app/services/URL';
import { fade } from 'src/app/utilities/animations/animations';

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

  constructor(
    private httpApiService: HttpApiService
  ) { }

  ngOnInit(): void {
    this.getMaintenancetasks();
  }

  getMaintenancetasks(): void {
    this.httpApiService.get(maintenanceTasksEndpoint, [])
      .subscribe(
        (next: any) => {
          this.allMaintenaceTasks = next;
          this.setCurrentMaintenacetasksByMode();
          this.sortByStatus();
          this.mode = Mode.ALL;
        }
      );
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
      default:{
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
