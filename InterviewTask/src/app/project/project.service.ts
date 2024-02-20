import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectList:any[]=[];

  url: string = "http://localhost:3000/project/";

  constructor(private http: HttpClient) { }

  public addProject(project:any):Observable<any>{
    return this.http.post<any>(this.url,project).pipe(
      catchError(this.errorHandler)
    );
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

  public getProjectList(): Observable<any[]> { 
    return this.http.get<any[]>(this.url).pipe( 
      tap(projects => { 
        this.projectList = projects; 
      }), 
      catchError(this.errorHandler) 
    ); 
  } 
 
  public getProjectDetailsById(id: number): Observable<any> { 
    const projectUrl = '${this.url}/${id}'; 
       
    return this.http.get<any>(projectUrl).pipe( 
      catchError(error => { 
        console.error('Error fetching project details:', error); 
        return throwError(error); 
      }) 
    ); 
  }

}
