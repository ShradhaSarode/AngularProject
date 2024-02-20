import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Login } from './loginDTO';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // log: Login[] = [];
  url: string = "http://localhost:3000/login/"
  constructor(private http: HttpClient) { }

  public login(credentials: any): Observable<Login> {
    // return this.http.post<any>(this.url,credentials).pipe(catchError(this.errorHandler));
    return this.http.get<any[]>(this.url).pipe(map(login => {
      console.log(Login);
      const matchingUser = login.find(user =>
        user?.email === credentials.email && user.password===credentials.password);
        console.log(matchingUser);
      return matchingUser;
    }),
      catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // public validateUser(log: Login): boolean {
  //   let result: boolean = false;
  //   for (let i = 0; i < this.log.length; i++) {
  //     if (this.log[i].email == log.email && this.log[i].password == log.password) {
  //       result = true;
  //       break;
  //     }
  //   }
  //   return result;
  // }
}
