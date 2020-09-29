import { Component, OnInit } from '@angular/core';
import { MaintenanceTask } from 'src/app/models/MaintenanceTask';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-report-breakdown-page',
  templateUrl: './report-breakdown-page.component.html',
  styleUrls: ['./report-breakdown-page.component.css'],
  animations: [fade]
})
export class ReportBreakdownPageComponent implements OnInit {
  public readonly REPAIR_PLACE_MIN_LENGTH = 3;
  public statement = '';
  public maintenaceTask: MaintenanceTask = {};
  constructor() { }

  ngOnInit(): void {
  }

}
