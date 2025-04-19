import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Asistencia } from '../../model/asistencia';
import { AsistenciaDTO } from '../../model/DTO/asistenciaDTO';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(asistencia: Asistencia): Observable<any> {
    return this.httpClient.post<Asistencia>(this.apiServer + '/addAsistencias', asistencia)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<Asistencia>(this.apiServer + '/getByIdAsistencias/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Asistencia[]>(this.apiServer + '/getAllAsistencias')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  findByUserAndRegAndAsociado(): Observable<any> {
    return this.httpClient.get<AsistenciaDTO[]>(this.apiServer + '/findByUserAndRegAndAsociado')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(asistencia: Asistencia): Observable<any> {
    return this.httpClient.put<Asistencia>(this.apiServer + '/updateAsistencias', asistencia)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id) {
    return this.httpClient.delete<Asistencia>(this.apiServer + '/deleteAsistencias/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    let mensaje = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      mensaje = error.error.data;
    }
    return throwError(error);
  }
}

