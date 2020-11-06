import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppUser } from 'src/app/models/AppUser';
import { TaskDetailsDeleteUserDialogComponent } from './dialogs/task-details-delete-user-dialog/task-details-delete-user-dialog.component';

@Component({
  selector: 'app-task-details-users-tab',
  templateUrl: './task-details-users-tab.component.html',
  styleUrls: ['./task-details-users-tab.component.css']
})
export class TaskDetailsUsersTabComponent implements OnInit {

  @Input()
  public appUsers: AppUser[];

  @Output()
  public deleteAppUserEmitter = new EventEmitter();

  @Output()
  public addAppUserEmitter = new EventEmitter();

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  public deleteAppUser(appUser: AppUser) {
    const dialogRef = this.matDialog.open(TaskDetailsDeleteUserDialogComponent,
      {
        data: appUser
      });

    dialogRef.afterClosed()
      .subscribe(
        (x: string) => {
          if (x === 'true') { this.deleteAppUserEmitter.emit(appUser.id) }
        }
      );
  }

  public addAppUser(appUserId: number){
    this.addAppUserEmitter.emit(appUserId);
  }

}
