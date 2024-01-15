import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  @Input()msg1:string='';
  @Output()passStud=new EventEmitter<string>();
  studentList:IStudent[]=[
    {sid:111,sname:"Sita",scity:"Nashik"},
    {sid:112,sname:"Gita",scity:"Nagpur"},
    {sid:113,sname:"Nita",scity:"Noida"}
  ];
  sendMsg()
  {
    this.passStud.emit("Hiiii from student child....");
  }
}
export interface IStudent
{
  sid:number;
  sname:string;
  scity:string;
}