import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Mes } from '../../model/mes';



@Injectable({
  providedIn: 'root'
})
export class MesService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(mes: Mes): Observable<any> {
    return this.httpClient.post<Mes>(this.apiServer + '/addMes', mes)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<Mes>(this.apiServer + '/getByIdMes/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Mes[]>(this.apiServer + '/getAllMess')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(mes: Mes): Observable<any> {
    return this.httpClient.put<Mes>(this.apiServer + '/updateMes', mes)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<Mes>(this.apiServer + '/deleteMes/' + id)
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

