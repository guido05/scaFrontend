import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Condicion } from '../../model/condicion';


@Injectable({
  providedIn: 'root'
})
export class CondicionService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(condicion: Condicion): Observable<any> {
    return this.httpClient.post<Condicion>(this.apiServer + '/addCondicion', condicion)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<Condicion>(this.apiServer + '/getByIdCondicion/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Condicion[]>(this.apiServer + '/getAllCondicion')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(condicion:Condicion): Observable<any> {
    return this.httpClient.put<Condicion>(this.apiServer + '/updateCondicion',  condicion)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<Condicion>(this.apiServer + '/deleteCondicion/' + id)
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

