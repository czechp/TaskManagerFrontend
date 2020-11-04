import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-users-dialog-add',
  templateUrl: './add-task-users-dialog-add.component.html',
  styleUrls: ['./add-task-users-dialog-add.component.css']
})
export class AddTaskUsersDialogAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
