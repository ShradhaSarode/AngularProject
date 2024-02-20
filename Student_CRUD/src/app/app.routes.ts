import { Routes } from '@angular/router';
import { MarksComponent } from './marks/marks.component';
import { StudentComponent } from './student/student.component';

export const routes: Routes = [
    {path:'',redirectTo:'student',pathMatch:'full'},
    {path:'marks/:id',component:MarksComponent},
    {path:'student',component:StudentComponent}
];
