import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path:"employee",redirectTo:"employee"},
    {
        path:"employee",component:EmployeeComponent
    }
];
