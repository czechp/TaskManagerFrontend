import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-delete-goal-dialog',
  templateUrl: './task-details-delete-goal-dialog.component.html',
  styleUrls: ['./task-details-delete-goal-dialog.component.css']
})
export class TaskDetailsDeleteGoalDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit(): void {
  }

}
