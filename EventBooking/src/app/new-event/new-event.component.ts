import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterModule,HttpClientModule],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css'
})
export class NewEventComponent {
  eventObj: any = {
    "EventId": 0,
    "EventName": "",
    "Description": "",
    "Location": "",
    "StartDate": "",
    "StartTime": "",
    "EndDate": "",
    "EndTime": "",
    "ImageUrl": "",
    "Capacity": "",
    "Price": 0,
    "OrganizerId": 0,
    "IsIdentityMandatory": true,
    "IsCoupleEntryMandatory": true
  };
  loggedUserData:any;
  constructor(private http:HttpClient) {
    const localData= localStorage.getItem('eventUser');
    if(localData != null) { 
      this.loggedUserData = JSON.parse(localData);
      this.eventObj.OrganizerId = this.loggedUserData.userId;
    }
  }

  onCreateEvent() {
    this.http.post('https://freeapi.miniprojectideas.com/api/EventBooking/CreateEvent', this.eventObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Event Created');
        this.eventObj = {
          "EventId": 0,
          "EventName": "",
          "Description": "",
          "Location": "",
          "StartDate": "",
          "StartTime": "",
          "EndDate": "",
          "EndTime": "",
          "ImageUrl": "",
          "Capacity": "",
          "Price": 0,
          "OrganizerId": 0,
          "IsIdentityMandatory": true,
          "IsCoupleEntryMandatory": true
        };
      } else {
        alert(res.data)
      }
    })
  }
}
