import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Idioma } from '../../model/idioma';


@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  public apiServer;
  public apiCommon;
  constructor(private httpClient: HttpClient) {
    this.apiServer = environment.apiUrl;
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Idioma[]>(this.apiCommon + '/idioma')
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

