import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { Categoria } from '../../model/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public apiServer;
  constructor(private httpClient: HttpClient) {

    this.apiServer = environment.apiUrl;
  }

  create(categoria: Categoria): Observable<any> {
    return this.httpClient.post<Categoria>(this.apiServer + '/addCategoria', categoria)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id): Observable<any> {
    return this.httpClient.get<Categoria>(this.apiServer + '/getByIdCategoria/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<any> {
    return this.httpClient.get<Categoria[]>(this.apiServer + '/getAllCategorias')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(categoria:Categoria): Observable<any> {
    return this.httpClient.put<Categoria>(this.apiServer + '/updateCategoria',  categoria)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id){
    return this.httpClient.delete<Categoria>(this.apiServer + '/deleteCategoria/' + id)
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

