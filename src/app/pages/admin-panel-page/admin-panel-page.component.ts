import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../models/AppUser';
import {HttpApiService} from '../../services/httpApiService/http-api.service';
import {changeUserRoleEndpoint, usersEndpoint} from '../../services/URL';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css']
})
export class AdminPanelPageComponent implements OnInit {
  public statement = '';
  public users: AppUser[] = [];

  constructor(
    private httpApiService: HttpApiService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.httpApiService.get(usersEndpoint, [])
      .subscribe(
        (next: any) => {
          this.users = next.sort((user1, user2) => user1.username.localeCompare(user2.username));
        },
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(error.status);
        }
      );
  }

  activateUser(id: number, activate: boolean) {
    const activateParameter = activate ? 'activate' : 'deactivate';
    this.httpApiService.patch(usersEndpoint + changeUserRoleEndpoint + '/' + id,
      {},
      [{name: 'status', parameter: activateParameter}])
      .subscribe(
        (next: any) => {
          this.getUsers();
        },
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(error.status);
        }
      );
  }
}
