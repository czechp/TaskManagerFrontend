import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private httpClient: HttpClient) {
  }

  public post(endpoint: string, body: any, params: any[]): Observable<any> {
    return this.httpClient.post(URL + endpoint, body, { params: this.getParams(params) });
  }

  public head(endpoint: string, params: any[]): Observable<any> {
    return this.httpClient.head(URL + endpoint, { params: this.getParams(params) });
  }

  public get(endpoint: string, params: any[]): Observable<any> {
    return this.httpClient.get(URL + endpoint, { params: this.getParams(params) });
  }

  public patch(endpoint: string, body: any, params: any[]): Observable<any> {
    return this.httpClient.patch(URL + endpoint, {}, { params: this.getParams(params) });
  }

  public delete(endpoint: string, params: any[]): Observable<any> {
    return this.httpClient.delete(URL + endpoint, {params: this.getParams(params)});
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
      case 400: {
        result += ' Nie poprawne zapytanie do serwera';
        break;
      }
      case 401: {
        result += ' Zaloguj się';
        break;
      }
      case 403: {
        result += ' Brak wystarczjących uprawnień';
        break;
      }
      case 404: {
        result += ' Element nie istnieje';
        break;
      }
      case 409: {
        result += ' Taki element już istnieje';
        break;
      }

    }
    return result;
  }
}
