import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URL} from '../URL';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private httpClient: HttpClient) {
  }

  public post(endpoint: string, body: any, params: any[]): Observable<any> {
    return this.httpClient.post(URL + endpoint, body, {params: this.getParams(params)});
  }

  public head(endpoint: string, params: any[]): Observable<any> {
    return this.httpClient.head(URL + endpoint, {params: this.getParams(params)});
  }

  public get(endpoint: string, params: any[]): Observable<any> {
    return this.httpClient.get(URL + endpoint, {params: this.getParams(params)});
  }

  private getParams(params: any[]) {
    let httpParams = new HttpParams();
    for (const param of params) {
      httpParams = httpParams.append(param.name, param.parameter);
    }
    return httpParams;
  }

  errorStatementHandler(status: number) {
    let result = 'Błąd! ';
    switch (status) {
      case 422: {
        result += 'Nie poprawne dane';
        break;
      }
    }
    return result;
  }
}
