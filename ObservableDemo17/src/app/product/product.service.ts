import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError ,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string="http://localhost:8085/product/"
  constructor(private http:HttpClient) { }
  // Observable<boolean> --> to make async call <> return type / type of response
  // that we will get from server
  public getProducts():Observable<any>{
    return this.http.get<any>(this.url+"getallproducts");
  }


  public saveProduct(product:any):Observable<any>{
   return this.http.post<any>(this.url+"saveProduct",product).pipe(
    catchError(this.errorHandler)
   );
  }
  public updateProduct(id:any,product:any):Observable<any>{
    return this.http.put<any>(this.url+"updateProduct",product).pipe(
     catchError(this.errorHandler)
    );
   }
   public deleteProduct(id:any):Observable<any>{
    return this.http.delete<any>(this.url+"deleteProduct/"+id).pipe(
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
