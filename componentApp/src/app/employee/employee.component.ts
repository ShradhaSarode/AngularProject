import { CommonModule } from '@angular/common';
import { Component,inject,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employeeDTO';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/departmentDTO';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit
{
  //emp:Employee={};
  employeeServise:EmployeeService=inject(EmployeeService);
  employeeList:Employee[]=[];
  departmentService:DepartmentService=inject(DepartmentService);
  departmentList:Department[]=[];
  getDept: any;
  // constructor(private departmentService: DepartmentService)
  // {

  // }
  addEmployee()
  {
    this.employeeServise.addEmployee(this.employee);
    this.getEmployee();
  }
  
  ngOnInit():void{
    this.getEmployee();
    this.getDepartments();
    this.isUpdatebtn=false;
    this.employee.id;
    //this.departmentList=this.departmentService.getAllDepartment();
  }
 
  getEmployee()
  {
    this.employeeList=this.employeeServise.getAllEmployees();
  }
  getDepartments(){
    this.departmentList=this.departmentService.getAllDepartment();
  }
  employee:Employee={};

  saveEmployee()
  {
    if(!this.isUpdatebtn)
    {
      this.employeeServise.addEmployee(this.employee);
    }
    else{
      this.employeeServise.updateEmployee(this.employee);
    }
    this.getEmployee()
    this.employee={};
    this.isUpdatebtn=false;
  }

  isUpdatebtn:boolean=false;
  editEmployee(emp:Employee)
  {
    this.isUpdatebtn=true;
    this.employee=emp;
  }
 //delete emp
deleteEmployee(id:number |undefined){
  let response=confirm('Do you want to delete id '+id +' ?');
  if(response==true){
   this.employeeServise.deleteEmployee(id);
   this.getEmployee();
  }
 }
 
}
