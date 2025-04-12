import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Dia } from '../../model/dia';


@Injectable({
  providedIn: 'root'
})
export class DiaService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(dia: Dia): Observable<any> {
    return this.httpClient.post<Dia>(this.apiServer + '/addDia', dia)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<Dia>(this.apiServer + '/getByIdDia/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Dia[]>(this.apiServer + '/getAllDia')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(dia:Dia): Observable<any> {
    return this.httpClient.put<Dia>(this.apiServer + '/updateDia',  dia)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<Dia>(this.apiServer + '/deleteDia/' + id)
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

