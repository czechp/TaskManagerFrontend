import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Role } from 'src/app/models/Role';
import { AppUser } from '../../models/AppUser';
import { HttpApiService } from '../../services/httpApiService/http-api.service';
import { changeUserRoleEndpoint, usersEndpoint, rolesEndpoint } from '../../services/URL';
import { fade, slideOut } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.css'],
  animations: [
    fade,
    slideOut
  ]
})
export class AdminPanelPageComponent implements OnInit {
  public statement = '';
  public users: AppUser[] = [];
  public roles: string[] = [];

  constructor(
    private httpApiService: HttpApiService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
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

  public activateUser(id: number, activate: boolean) {
    const activateParameter = activate ? 'activate' : 'deactivate';
    this.httpApiService.patch(usersEndpoint + changeUserRoleEndpoint + '/' + id,
      {},
      [{ name: 'status', parameter: activateParameter }])
      .subscribe(
        (next: any) => {
          this.getUsers();
        },
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(error.status);
        }
      );
  }

  private getRoles() {
    this.httpApiService.get(usersEndpoint + rolesEndpoint, [])
      .subscribe(
        (next: any) => {
          this.roles = next.map(x => x.role);
          this.roles = this.roles.sort((x1: string, x2: string) => x1.localeCompare(x2));
        },
        (error: any) => {
          this.statement = this.httpApiService.errorStatementHandler(error.status);
        }
      );
  }

  public changeUserRole(id: number, role: string): void {
    this.clearStatement();
    if (role !== undefined) {
      this.httpApiService.patch(
        usersEndpoint + rolesEndpoint + '/' + id,
        {},
        [{ name: 'role', parameter: role }]
      )
        .subscribe(
          (next: any) => { this.getUsers(); },
          (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status); }
        );
    } else {
      this.statement = 'Błąd! Wybierz poprawną role';
    }
  }

  public deleteUser(id: number): void {
    this.clearStatement();
    this.httpApiService.delete(usersEndpoint + "/" + id, [])
      .subscribe(
        (next: any) => { this.users = this.users.filter(x => x.id !== id) },
        (error: any) => { this.statement = this.httpApiService.errorStatementHandler(error.status) }
      );
  }

  private clearStatement() {
    this.statement = '';
  }
}
