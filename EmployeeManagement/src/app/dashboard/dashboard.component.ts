import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  queryValue: string | unknown;
  userList:any=[];
  isUpdatebtn!: boolean;
  registerForm!:FormGroup;
  currentUser: any;

  weatherData: any;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
  private empService:ManagementService) { }

  ngOnInit(): void {
    this.verifyUserLocation();
  }
  
  
  verifyUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
       this.getLocationOfUser(latitude, longitude);
       console.log(latitude);
       console.log(longitude);
      //this.getLocationOfUser(37.7749, -122.4194);
       // Example usage
     //  const latitude = 37.7749; // Example latitude (San Francisco)
     //  const longitude = -122.4194; // Example longitude (San Francisco)
       
        //console.log(latitude:${latitude}, longitude:${longitude});
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          default:
            console.error("An unknown error occurred.");
            break;
        }
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }

  getLocationOfUser(latitude:any, longitude:any)
  {
    this.empService.getEmpLocation(latitude,longitude).subscribe(result => {
      console.log(result);
      // whether report 
      this.empService.weatherReport(result.address.city).subscribe(
      data => {
        this.weatherData = data;
        console.log('Weather Data:', this.weatherData);
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
    });
    
  }
  logout()
{
  this.router.navigate(['/login']);
}
}
