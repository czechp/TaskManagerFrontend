import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details-delete-subtask-dialog',
  templateUrl: './task-details-delete-subtask-dialog.component.html',
  styleUrls: ['./task-details-delete-subtask-dialog.component.css']
})
export class TaskDetailsDeleteSubtaskDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
