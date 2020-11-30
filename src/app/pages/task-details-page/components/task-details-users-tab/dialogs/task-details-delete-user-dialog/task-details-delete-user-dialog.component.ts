import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-delete-user-dialog',
  templateUrl: './task-details-delete-user-dialog.component.html',
  styleUrls: ['./task-details-delete-user-dialog.component.css']
})
export class TaskDetailsDeleteUserDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
