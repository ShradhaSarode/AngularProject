import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';

export const routes: Routes = [
    {path:'',redirectTo:'product',pathMatch:'full'},
    {path:'product-details/:id',component:ProductDetailsComponent},
    {path:'product',component:ProductComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'department',component:DepartmentComponent}
];
