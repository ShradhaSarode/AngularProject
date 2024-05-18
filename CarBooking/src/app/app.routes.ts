import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { BookingComponent } from './booking/booking.component';
import { CarsComponent } from './cars/cars.component';
import { CartypeComponent } from './cartype/cartype.component';



export const routes: Routes = [
    {path:'',redirectTo:'index',pathMatch:'full'},
    {path:'index',component:IndexComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'search',component:SearchComponent},
    {path:'booking',component:BookingComponent},
    {path:'cars',component:CarsComponent},
    {path:'cartype',component:CartypeComponent},
    // {path:'image',component:ImageComponent}
   
];