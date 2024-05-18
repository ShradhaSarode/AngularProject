import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { SearchComponent } from './search/search.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarsComponent } from './cars/cars.component';
import { CartypeComponent } from './cartype/cartype.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
            RouterOutlet,
          LoginComponent,
          RegisterComponent,
          BookingComponent,
          IndexComponent,
          SearchComponent,
          CarsComponent,
          CartypeComponent
        ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CarBooking';
  
}
