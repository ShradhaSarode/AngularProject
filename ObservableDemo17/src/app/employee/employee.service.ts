import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url:string="http://localhost:8085/employee/"
  constructor(private http:HttpClient) { }
  // Observable<boolean> --> to make async call <> return type / type of response
  // that we will get from server
  public getEmp():Observable<any>{
    return this.http.get<any>(this.url+"getallEmp");
  }


  public saveEmp(employee:any):Observable<any>{
   return this.http.post<any>(this.url+"saveEmp",employee).pipe(
    catchError(this.errorHandler)
   );
  }
  public updateEmp(id:any,employee:any):Observable<any>{
    return this.http.put<any>(this.url+"updateEmp",employee).pipe(
     catchError(this.errorHandler)
    );
   }
   public deleteEmp(id:any):Observable<any>{
    return this.http.delete<any>(this.url+"deleteEmp/"+id).pipe(
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
