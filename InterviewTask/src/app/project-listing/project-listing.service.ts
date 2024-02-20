import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListingService {

  private projectList:any[]=[];

  url: string = "http://localhost:3000/project";

  constructor(private http: HttpClient) { }

public getAllProject():Observable<any>
{
  return this.http.get(this.url);
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

  // updateStatus(p:any){
  //   return this.http.put<any>(this.url,p).pipe(
  //     catchError(this.errorHandler)
  //   );
  // }
  updateStatus(project: any): Observable<any> { 
    const updateUrl = `${this.url}/${project.id}`; 
    return this.http.put<any>(updateUrl, project).pipe( 
      catchError(this.errorHandler) 
    ); 
  }
}
