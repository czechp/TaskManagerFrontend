import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/AppUser';
import { Task } from 'src/app/models/Task';
import { HttpApiService } from 'src/app/services/httpApiService/http-api.service';
import { usersEndpoint } from 'src/app/services/URL';

@Component({
  selector: 'app-add-task-users',
  templateUrl: './add-task-users.component.html',
  styleUrls: ['./add-task-users.component.css']
})
export class AddTaskUsersComponent implements OnInit {

  public appUsers: AppUser[] = [];
  public statement = '';

  constructor(private httpApiService: HttpApiService) { }

  ngOnInit(): void {
    this.getAppUsers();
  }

  public getAppUsers() {
    this.clearStatement();
    this.httpApiService.get(usersEndpoint, [])
      .subscribe(
        (next: any) => { this.appUsers = next; console.log(this.appUsers) },
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
      );
  }

  private clearStatement() {
    this.statement = '';
  }

}
