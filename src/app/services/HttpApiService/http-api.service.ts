import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {url} from '../Url';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private httpClient: HttpClient) {
  }

  public post(endpoint: string, body: any, params: any[]): Observable<any> {
    let httpParams = new HttpParams();
    for (const param of params) {
      httpParams = httpParams.append(param.name, param.parameter);
    }
    return this.httpClient.post(url + endpoint, body, {params: httpParams});
  }

}
