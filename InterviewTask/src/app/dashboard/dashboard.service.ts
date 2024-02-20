import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = "http://localhost:3000/project";

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

  updateStatus(project: any): Observable<any> { 
    const updateUrl = `${this.url}/${project.id}`; 
    return this.http.put<any>(updateUrl, project).pipe( 
      catchError(this.errorHandler) 
    ); 
  } 
 
  
  getStatusCountByStatus(status:string):Observable<number> 
  { 
 return this.http.get<any[]>(this.url).pipe( 
  map(projects=>projects.filter(project=>project.status===status).length), 
  catchError(this.errorHandler) 
 ); 
 
  } 
 
  getRunningCount():Observable<number>{ 
    return this.getStatusCountByStatus('Running'); 
  } 
 
  getCancelledCount():Observable<number>{ 
    return this.getStatusCountByStatus('Cancelled'); 
  } 
 
  getClosedCount():Observable<number>{ 
    return this.getStatusCountByStatus('Closed'); 
  } 
 
  getTotalCount(): Observable<number> { 
    return this.http.get<any[]>(this.url).pipe( 
      map(projects => projects.length), 
        catchError(this.errorHandler) 
    ); 
 
  } 
 
  getClosureDelayCount(): Observable<number> { 
    const today = new Date(); 
    // console.log('Today:', today); 
    return this.http.get<any[]>(this.url).pipe( 
      map(projects => projects.filter(project => project.status === 'Running' && new Date(project.enddate) < today).length), 
      catchError(this.errorHandler) 
    ); 
  } 
   
   
  getStatusCountByStatusAndDepartment(status: string, department: string): Observable<number> { 
    return this.http.get<any[]>(this.url).pipe( 
      map(projects => projects.filter(project => project.status === status && project.department === department).length), 
      catchError(this.errorHandler) 
    ); 
  } 
   
  getTotalCountByDepartment(department: string): Observable<number> { 
    return this.http.get<any[]>(this.url).pipe( 
      map(projects => projects.filter(project => project.department === department).length), 
      catchError(this.errorHandler) 
    ); 
  } 
}
