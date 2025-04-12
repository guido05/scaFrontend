import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { AsociadoCondicion } from '../../model/asociadoCondicion';


@Injectable({
  providedIn: 'root'
})
export class AsociadoCondicionService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(asociadoCondicion: AsociadoCondicion): Observable<any> {
    return this.httpClient.post<AsociadoCondicion>(this.apiServer + '/addAsociadosCondicion', asociadoCondicion)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<AsociadoCondicion>(this.apiServer + '/getByIdAsociadosCondicion/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<AsociadoCondicion[]>(this.apiServer + '/getAllAsociadosCondicion')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(asociadoCondicion:AsociadoCondicion): Observable<any> {
    return this.httpClient.put<AsociadoCondicion>(this.apiServer + '/updateAsociadosCondicion',  asociadoCondicion)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<AsociadoCondicion>(this.apiServer + '/deleteAsociadosCondicion/' + id)
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

