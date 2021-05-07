import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceBase {

  constructor(protected http: HttpClient) {}

  getById(api: string, id: number) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.get(urlApi);
  }

  post(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.post(urlApi, body);
  }

  put(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body);
  }

  update(api: string, body: any) {
    const urlApi = `${environment.api.baseUrl}${api}`;
    return this.http.put(urlApi, body);
  }

  delete(api: string, id: string) {
    const urlApi = `${environment.api.baseUrl}${api}/${id}`;
    return this.http.delete(urlApi);
  }
}
