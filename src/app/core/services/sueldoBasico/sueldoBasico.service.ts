import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { SueldoBasico } from '../../model/sueldoBasico';


@Injectable({
  providedIn: 'root'
})
export class SueldoBasicoService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(sueldoBasico: SueldoBasico): Observable<any> {
    return this.httpClient.post<SueldoBasico>(this.apiServer + '/addSueldoBasico', sueldoBasico)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<SueldoBasico>(this.apiServer + '/getByIdSueldoBasico/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<SueldoBasico[]>(this.apiServer + '/getAllSueldoBasicos')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(sueldoBasico:SueldoBasico): Observable<any> {
    return this.httpClient.put<SueldoBasico>(this.apiServer + '/updateSueldoBasico',  sueldoBasico)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<SueldoBasico>(this.apiServer + '/deleteSueldoBasico/' + id)
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

