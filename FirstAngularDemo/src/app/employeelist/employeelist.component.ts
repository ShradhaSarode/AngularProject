import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})

export class EmployeelistComponent {
  @Input() msg:string='';
  @Output() passValue=new EventEmitter<string>();
  employeeList:IEmployee[]=[
    {empId:101,empName:"Ritu",empCity:"Nashik"},
    {empId:101,empName:"Nitu",empCity:"Nagpur"}
  ];
  sendMessage(){
    this.passValue.emit("Hi,From Child");
  }

}
export interface IEmployee
{
  empId:number;
  empName:string;
  empCity:string;
}
