import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-event-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterModule,HttpClientModule,DatePipe],
  templateUrl: './event-bookings.component.html',
  styleUrl: './event-bookings.component.css'
})
export class EventBookingsComponent {
  bookings:any[]=[];
  constructor(private http: HttpClient){
    const localData= localStorage.getItem('eventUser');
    if(localData != null) { 
     const user = JSON.parse(localData);
     this.getMyBpooking()
    }
  }

  getMyBpooking() {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetAllEventBooking').subscribe((res:any)=>{
     this.bookings = res.data;
    })
  }
}
