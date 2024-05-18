import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  
  url: string = "http://localhost:8085/login/"
  urlregister:string="http://localhost:8085/register/"
  urlcar:string="http://localhost:8085/cars/"
  urlcarType:string="http://localhost:8085/cartype/"
  urlindex:string="http://localhost:3000/index/"
  urlsearch:string="http://localhost:8085/search/"
  urlbooking:string="http://localhost:8085/booking/"
  cars: any;
  indexlist:any[]=[];
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


  public getUser():Observable<any>{
    return this.http.get<any>(this.urlregister+"getallUser");//+"getallUser")
  }


  public saveUser(user:any):Observable<any>{
   return this.http.post<any>(this.urlregister+"saveUser",user).pipe(
    catchError(this.errorHandler)//+"saveUser"
   );
  }
  public login(user:any):Observable<any>{
    return this.http.post<any>(this.urlregister+"userLogin",user).pipe(
     catchError(this.errorHandler)//+"saveUser"
    );
   }

   public getCar():Observable<any>{
    return this.http.get<any>(this.urlcar+"getallCar");
  }


  public saveCar(cars:any):Observable<any>{
   return this.http.post<any>(this.urlcar+"saveCar",cars).pipe(
    catchError(this.errorHandler)
   );
  }
  public updateCar(id:any,cars:any):Observable<any>{
    return this.http.put<any>(this.urlcar+"updateCar",cars).pipe(
     catchError(this.errorHandler)
    );
   }
   public deleteCar(id:any):Observable<any>{
    return this.http.delete<any>(this.urlcar+"deleteCar/"+id).pipe(
     catchError(this.errorHandler)
    );
   }

   public getCarType():Observable<any>{
    return this.http.get<any>(this.urlcarType+"getallCarType");
  }

  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post<any>('../assets/image/', formData);
  }

  bookCar(Car:any):Observable<any>
  {
    return Car;
  }

  getCarById(id: any): Observable<any> {
    
    const urlget = "http://localhost:8085/cars/" // Replace with your API endpoint ${id}
    return this.http.get<any>(urlget+"getCarById/"+id);
  }

  public getDatetime(datetime:any):Observable<any>{
    return this.http.post<any>(this.urlindex,datetime).pipe(
     catchError(this.errorHandler)
    );
   }

   updateStatus(car: any): Observable<any> { 
    const updateUrl = `${this.urlcar}/${car.id}`; 
    return this.http.put<any>(updateUrl, car).pipe( 
      catchError(this.errorHandler) 
    ); 
  }

  public getUserid(userid:any):Observable<any>
  {
    return this.http.post<any>(this.url,userid).pipe(catchError(this.errorHandler));
  }

  public saveBooking(booking:any):Observable<any>{
    return this.http.post<any>(this.urlbooking+"saveBooking",booking).pipe(
     catchError(this.errorHandler)
    );
   }

}
