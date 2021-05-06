import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppServiceBase } from '../core/AppServiceBase';
import { Persona } from '../models/persona';
import {catchError, map} from 'rxjs/operators';
import { ExperienciaLaboral } from '../models/experienciaLaboral';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService extends AppServiceBase{

  buscarPersonaPorId(id: number): Observable<any>{
    return this.getById('/informacion/buscar', id).pipe(map(response => {
      return response;
    }));
  }

  crearInformacionPersonal(persona: Persona): Observable<any> {
    return this.post('/informacion/create/', persona)
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(e);
          }
        )
      );
  }

  actualizarInformacionPersonal(persona: Persona): Observable<any> {
    return this.put(`/informacion/update/${persona.id}`, persona)
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(e);
          }
        )
      );
  }

  crearExperienciaLaboral(experienciaLaboral: ExperienciaLaboral): Observable<any> {
    return this.post('/experiencia/create/', experienciaLaboral)
      .pipe(
        map((response: any) => response.experienciaLaboral as ExperienciaLaboral),
        catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(e);
          }
        )
      );
  }

}
