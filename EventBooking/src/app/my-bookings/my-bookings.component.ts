import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterModule,HttpClientModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  bookings:any[]=[];
  constructor(private http: HttpClient){
    const localData= localStorage.getItem('eventUser');
    if(localData != null) { 
     const user = JSON.parse(localData);
     this.getMyBpooking(user.userId)
    }
  }

  getMyBpooking(userid:number) {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetBookingsByCustomer?customerId='+userid).subscribe((res:any)=>{
    this.bookings = res.data;
    })
  }
}
