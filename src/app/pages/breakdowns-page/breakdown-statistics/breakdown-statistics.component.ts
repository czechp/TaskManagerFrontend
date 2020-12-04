import { Component, Input, OnInit } from '@angular/core';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { getDateObject } from 'src/app/utilities/timeOperations';

@Component({
  selector: 'app-breakdown-statistics',
  templateUrl: './breakdown-statistics.component.html',
  styleUrls: ['./breakdown-statistics.component.css']
})
export class BreakdownStatisticsComponent implements OnInit {

  private currentDate: Date;

  @Input()
  public maintenanceTasks: MaintenanceTask[] = [];
  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
  }


  public allTaskNumber(): number {
    return this.maintenanceTasks.length;
  }

  public allTaskDoneNumber(): number {
    return this.maintenanceTasks.filter((x: MaintenanceTask) => x.taskStatus === 'DONE').length;
  }

  public allReportedTaksNumber(): number {
    return this.maintenanceTasks.filter((x: MaintenanceTask) => x.taskStatus === 'TODO' || x.taskStatus === 'IN_PROGRESS').length;
  }

  public allTaskDoneInThisMonthNumber(): number {
    return this.maintenanceTasks.filter((x: MaintenanceTask) => x.taskStatus === 'DONE'
      && this.currentDate.getUTCMonth() === getDateObject(x.finishDate).getUTCMonth()).length;
  }

  public allReportedTaskInThisMonthNumber(): number {
    return this.maintenanceTasks.filter(
      (x: MaintenanceTask) =>
        (x.taskStatus === 'DONE' || x.taskStatus === 'IN_PROGRESS')
        && (this.currentDate.getUTCMonth() === getDateObject(x.creationDate).getUTCMonth())
        && (this.currentDate.getUTCFullYear() === getDateObject(x.creationDate).getUTCFullYear())
    ).length;
  }

}
