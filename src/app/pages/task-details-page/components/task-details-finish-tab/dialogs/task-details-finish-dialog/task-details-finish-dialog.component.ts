import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-finish-dialog',
  templateUrl: './task-details-finish-dialog.component.html',
  styleUrls: ['./task-details-finish-dialog.component.css']
})
export class TaskDetailsFinishDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
