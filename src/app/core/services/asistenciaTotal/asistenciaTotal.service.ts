import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import {AsistenciaTotal} from '../../model/asistenciaTotal';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaTotalService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(asistenciaTotal: AsistenciaTotal): Observable<any> {
    return this.httpClient.post<AsistenciaTotal>(this.apiServer + '/addAsistenciaTotal', asistenciaTotal)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<AsistenciaTotal>(this.apiServer + '/getByIdAsistenciaTotal/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<AsistenciaTotal[]>(this.apiServer + '/getAllAsistenciaTotal')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(asistenciaTotal:AsistenciaTotal): Observable<any> {
    return this.httpClient.put<AsistenciaTotal>(this.apiServer + '/updateAsistenciaTotal', asistenciaTotal)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<AsistenciaTotal>(this.apiServer + '/deleteAsistenciaTotal/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    let mensaje = '';
    if(error.error instanceof ErrorEvent) {
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

