import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Asociado } from '../../model/asociado';

@Injectable({
  providedIn: 'root'
})
export class AsociadoService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(asociado: Asociado): Observable<any> {
    return this.httpClient.post<Asociado>(this.apiServer + '/addAsociados', asociado)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<Asociado>(this.apiServer + '/getByIdAsociados/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Asociado[]>(this.apiServer + '/getAllAsociados')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(asociado:Asociado): Observable<any> {
    return this.httpClient.put<Asociado>(this.apiServer + '/updateAsociados',  asociado)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<Asociado>(this.apiServer + '/deleteAsociados/' + id)
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

