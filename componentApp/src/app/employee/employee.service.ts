import { Injectable } from '@angular/core';
import { Employee } from './employeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList:Employee[]=[];
  private id:number=101;
  constructor() { 
    this.employeeList.push({
      id:101,name:"Sita",salary:45000,city:"pune",department:"IT"
    });
  }
  generateEmpId():number
  {
    this.id++;
    return this.id;
  }
  public getAllEmployees():Employee[]
  {
    return this.employeeList;
  }
  public getEmployeeById(id:number)
  {

  }
  public addEmployee(employee:Employee):void
  {
    employee.id=this.generateEmpId();
    this.employeeList.push({id:employee.id,name:employee.name,salary:employee.salary,city:employee.city,department:employee.department});

  }
  public updateEmployee(emp:Employee):void{
    for(let i=0;i<this.employeeList.length;i++){
      if(this.employeeList[i].id===emp.id){  // === to check whether value + data both are same
          this.employeeList[i].name=emp.name;
          this.employeeList[i].salary=emp.salary;
          this.employeeList[i].city=emp.city;
          this.employeeList[i].department=emp.department
          break;
      }
    }
  }

  public deleteEmployee(id:number|undefined){
    let i=0;
    for(;i<this.employeeList.length;i++){
      if(this.employeeList[i].id===id){  // === to check whether value + data both are same
          break;
      }
    }
    this.employeeList.splice(i,1);
  }

  

}
