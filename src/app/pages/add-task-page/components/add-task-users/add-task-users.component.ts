import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppUser } from 'src/app/models/AppUser';
import { Task } from 'src/app/models/Task';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { usersEndpoint } from 'src/app/services/URL';
import { AddTaskUsersDialogAddComponent } from './dialogs/add-task-users-dialog-add/add-task-users-dialog-add.component';

@Component({
  selector: 'app-add-task-users',
  templateUrl: './add-task-users.component.html',
  styleUrls: ['./add-task-users.component.css']
})
export class AddTaskUsersComponent implements OnInit {

  public appUsers: AppUser[] = [];
  public appUsersColumns = ['id', 'username', 'email']
  public statement = '';
  public alreadyAdded = false;

  @Output()
  public addAppUserEmitter = new EventEmitter();



  constructor(
    private httpApiService: HttpApiService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAppUsers();
  }

  public getAppUsers() {
    this.clearStatement();
    this.httpApiService.get(usersEndpoint, [])
      .subscribe(
        (next: any) => { this.appUsers = next;},
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
      );
  }

  public openAddDialog(appUser: AppUser): void {
    let dialogRef = this.matDialog.open(
      AddTaskUsersDialogAddComponent,
      { data: { username: appUser.username } }
    );

    dialogRef.afterClosed().subscribe(
      (result: any) => {
        if(result === 'true'){
          this.addAppUserEmitter.emit(appUser.id);
          this.alreadyAdded = true;
        }
      }
    );
  }



  private clearStatement() {
    this.statement = '';
  }



}
