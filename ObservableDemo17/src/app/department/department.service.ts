import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url:string="http://localhost:8085/department/"
  constructor(private http:HttpClient) { }
  // Observable<boolean> --> to make async call <> return type / type of response
  // that we will get from server
  public getDept():Observable<any>{
    return this.http.get<any>(this.url+"getallDept");
  }


  public saveDept(department:any):Observable<any>{
   return this.http.post<any>(this.url+"saveDept",department).pipe(
    catchError(this.errorHandler)
   );
  }
  public updateDept(id:any,department:any):Observable<any>{
    return this.http.put<any>(this.url+"updateDept",department).pipe(
     catchError(this.errorHandler)
    );
   }
   public deleteDept(id:any):Observable<any>{
    return this.http.delete<any>(this.url+"deleteDept/"+id).pipe(
     catchError(this.errorHandler)
    );
   }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
 }
}
