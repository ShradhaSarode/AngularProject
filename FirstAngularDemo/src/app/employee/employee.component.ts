import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  eid:number=0;
  ename:string=" ";
  ecity:string=" ";

  addEmployee()
  {
    console.log("Emp id: "+this.eid+"\nName: "+this.ename+"\nCity: "+this.ecity);
  }
}
