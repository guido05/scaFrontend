import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public apiServer;
  constructor(private httpClient: HttpClient) {
    this.apiServer= environment.apiUrl;
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

