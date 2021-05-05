import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppServiceBase {

  accessToken: any = '';
  authToken: any;
  storage: any;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache');

  constructor(protected http: HttpClient) {

  }

  getAll(api: string) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.get(urlApi, {headers: this.headers});
  }

  getAllTyped(api: string) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.get<any>(urlApi);
  }

  getById(api: string, id: number) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.get(urlApi, {headers: this.headers});
  }

  getByState(api: string, state: string) {
    const urlApi = `${environment.api.baseUrl}${api}/${state}`;
    return this.http.get(urlApi, {headers: this.headers});
  }

  post(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.post(urlApi, body, {headers: this.headers});
  }

  put(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body, {headers: this.headers});
  }

  update(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body, {headers: this.headers});
  }

  delete(api: string, id: string) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.delete(urlApi, {headers: this.headers});
  }


}
