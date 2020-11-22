import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fade } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-task-details-delete-task',
  templateUrl: './task-details-delete-task.component.html',
  styleUrls: ['./task-details-delete-task.component.css'],
  animations: [fade]
})
export class TaskDetailsDeleteTaskComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
