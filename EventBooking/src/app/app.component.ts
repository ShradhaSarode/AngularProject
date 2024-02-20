import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EventBookingsComponent } from './event-bookings/event-bookings.component';
import { EventListComponent } from './event-list/event-list.component';
import { HomeComponent } from './home/home.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { NewEventComponent } from './new-event/new-event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule,EventBookingsComponent,EventListComponent,
  HomeComponent,MyBookingsComponent,NewEventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventBooking';
  isLoginView: boolean= true;
  registerObj: any = {
    "UserId": 0,
    "Name": "",
    "Email": "",
    "Password": "",
    "ContactNo": "",
    "Role": ""
  };
  loginObj : any = {
    "Password": "",
    "ContactNo": ""
  }
  isUserLoggedin: boolean = false;
  loggedUserData:any;

  constructor(private http: HttpClient,private router:Router){
    const localData= localStorage.getItem('eventUser');
    if(localData != null) {
      this.isUserLoggedin =  true;
      this.loggedUserData = JSON.parse(localData);
    }
  }
  onRegiste() {
    this.isLoginView = false;
    const model = document.getElementById('myModal');
    if(model != null) {
      model.style.display = 'block';
    }
  }
  openLogin() {
    const model = document.getElementById('myModal');
    if(model != null) {
      model.style.display = 'block';
    }
  }
  closeModel() {
    const model = document.getElementById('myModal');
    if(model != null) {
      model.style.display = 'none';
    }
  }
  onRegister() {
    this.http.post('https://freeapi.miniprojectideas.com/api/EventBooking/CreateUser',this.registerObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Registration Success');
        this.closeModel()
      } else {
        alert(res.message)
      }
    })
  }
  onLogoff() {
      localStorage.removeItem('eventUser');
      this.isUserLoggedin = false;
      this.loggedUserData = undefined;
      this.router.navigateByUrl('/home')
  }

  onLogin() {
    this.http.post('https://freeapi.miniprojectideas.com/api/EventBooking/login',this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Login Success');
        localStorage.setItem('eventUser', JSON.stringify(res.data))
        this.isUserLoggedin =  true;
        this.loggedUserData = res.data;
        this.closeModel()
      } else {
        alert(res.message)
      }
    })
  }
}
