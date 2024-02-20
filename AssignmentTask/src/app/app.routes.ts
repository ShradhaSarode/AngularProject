import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    { path: 'login', component:LoginComponent },
      { path: 'registration', component:RegistrationComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'homepage', component:HomepageComponent }
    
];
