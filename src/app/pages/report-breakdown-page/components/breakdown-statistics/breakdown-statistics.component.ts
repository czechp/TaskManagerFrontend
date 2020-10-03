import { Component, Input, OnInit } from '@angular/core';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';

@Component({
  selector: 'app-breakdown-statistics',
  templateUrl: './breakdown-statistics.component.html',
  styleUrls: ['./breakdown-statistics.component.css']
})
export class BreakdownStatisticsComponent implements OnInit {

  @Input()
  public maintenanceTasks: MaintenanceTask[]=[];
  constructor() { }

  ngOnInit(): void {
  }


  public allTaskNumber():number{
    return this.maintenanceTasks.length;
  }

  public allTaskDoneNumber():number{
    return this.maintenanceTasks.filter((x: MaintenanceTask)=>x.taskStatus === "DONE").length;
  }


}
