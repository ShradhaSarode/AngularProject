import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'project',component:ProjectComponent},
    {path:'login',component:LoginComponent},   
    {path:'project-listing',component:ProjectListingComponent},
    {path:'dashboard',component:DashboardComponent}
];
