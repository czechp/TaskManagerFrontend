import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from '../httpApiService/http-api.service';
import { AuthorizationService } from '../security/authorizationService/authorization.service';
import { usersEndpoint } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class AppUsersService {

  constructor(
    private httpApiService: HttpApiService,
    private authorizationService: AuthorizationService
  ) { }


  public getCurrentUser():Observable<any>{
    return this.httpApiService.get(usersEndpoint + '/username', [{name: 'username', parameter: this.authorizationService.getUsername()}]);
  }
}
