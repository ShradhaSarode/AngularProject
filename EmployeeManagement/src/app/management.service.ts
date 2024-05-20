import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

   url: string = "http://localhost:8085/login/"
  urlregister:string="http://localhost:8085/ruser/"
  urlEmp:string="http://localhost:8085/employees/"
  urlDept:string="http://localhost:8085/department/"
  apiUrl:string="";
  

  //const $: JQueryStatic;

  constructor(private http: HttpClient) { }


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
  public login(user:any):Observable<any>{
    return this.http.post<any>(this.urlregister+"ruserLogin",user).pipe(
     catchError(this.errorHandler)
    );
   }
  public getUserid(userid:any):Observable<any>
  {
    return this.http.post<any>(this.url,userid).pipe(catchError(this.errorHandler));
  }
  public getUser():Observable<any>{
    return this.http.get<any>(this.urlregister+"getallUser");
  }


  public saveUser(user:any):Observable<any>{
   return this.http.post<any>(this.urlregister+"adduser",user).pipe(
    catchError(this.errorHandler)
   );
  }

  public getEmp():Observable<any>{
    return this.http.get<any>(this.urlEmp+"getallEmps");
  }


  public saveEmp(employee:any):Observable<any>{
   return this.http.post<any>(this.urlEmp+"saveEmps",employee).pipe(
    catchError(this.errorHandler)
   );
  }
  public updateEmp(id:any,employee:any):Observable<any>{
    return this.http.put<any>(this.urlEmp+"updateEmps",employee).pipe(
     catchError(this.errorHandler)
    );
   }
   public deleteEmp(id:any):Observable<any>{
    return this.http.delete<any>(this.urlEmp+"deleteEmps/"+id).pipe(
     catchError(this.errorHandler)
    );
   }

   public getDept():Observable<any>{
    return this.http.get<any>(this.urlDept+"getallDepts").pipe(
      catchError(this.errorHandler)
     );
  }

  postRequest(request: any):Observable<any> {
    return this.http.post<any>(this.urlregister + 'forgetPassword', request)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getEmpLocation(latitude:any, longitude:any):Observable<any>
  {
    const url='https://geocode.maps.co/reverse?lat='+latitude+'&lon='+longitude+'&api_key=664ae592d774e363450820zwced4dcc';
    return this.http.get<any>(url);
  }

  weatherReport(city:any): Observable<any> {
    //'+latitude+'&lon='+longitude+'
    const url = 'http://api.weatherapi.com/v1/current.json?key=29a0da3aa8c44b409c6105417242005&q='+city;

    return this.http.get<any>(url).pipe(
      catchError(this.errorHandler)
      
    );
  }

}
