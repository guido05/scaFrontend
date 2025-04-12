import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { PorcentajeMes } from '../../model/porcentajeMes';


@Injectable({
  providedIn: 'root'
})
export class PorcentajeMesService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(porcentajeMes: PorcentajeMes): Observable<any> {
    return this.httpClient.post<PorcentajeMes>(this.apiServer + '/addPorcentajeMes', porcentajeMes)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<PorcentajeMes>(this.apiServer + '/getByIdPorcentajeMes/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<PorcentajeMes[]>(this.apiServer + '/getAllPorcentajeMes')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(porcentajeMes:PorcentajeMes): Observable<any> {
    return this.httpClient.put<PorcentajeMes>(this.apiServer + '/updatePorcentajeMes',  porcentajeMes)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<PorcentajeMes>(this.apiServer + '/deletePorcentajeMes/' + id)
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

