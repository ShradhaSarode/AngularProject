import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterOutlet,HttpClientModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  loggedUserData: any;
  eventList: any[]=[];
  constructor(private http: HttpClient){
    const localData= localStorage.getItem('eventUser');
    if(localData != null) { 
      this.loggedUserData = JSON.parse(localData);
      this.loadEvent();
    }
  }

  loadEvent() {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetEventsByOrganizer?organizerId='+ this.loggedUserData.userId).subscribe((res:any)=>{
      this.eventList = res.data;
    })
  }
}
