import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
 
  emplist:any=[
    
  ];
 

 constructor(private id:number,private name:String,private salary:number)
 {
  this.emplist;
  id=101,name="shivani",salary=50000;
 }
 

  getemp()
  {
    this.emplist;
    console.log(this.emplist.id,this.emplist.name,this.emplist.salary);
  }
 
}
// export class employeeDTO
// {
//   private id:number;
//   private name:String;
//   private salary:number;
// }