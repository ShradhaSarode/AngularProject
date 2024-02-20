import { Injectable } from '@angular/core';
import { Employee } from './app/employeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 
  employeeList: Employee[] = []; 
  private id: number = 100; 
 
  constructor() { 
    this.employeeList.push({ id: 100, name: "Shradha", salary: 29000 }); 
  } 
 
  generateEmployeeId(): number { 
    this.id++; 
    return this.id; 
  } 
 
  public getAllEmployees(): Employee[] { 
    return this.employeeList; 
  } 
 
  public getEmployeeById(id: number) { 
    // Implement this method if needed 
  } 
 
  public addEmployee(employee: Employee): void { 
    employee.id = this.generateEmployeeId(); 
    this.employeeList.push({ id: employee.id, name: employee.name, salary: employee.salary }); 
  } 
 
  public updateEmployee(emp: Employee): void { 
    for (let i = 0; i < this.employeeList.length; i++) { 
      if (this.employeeList[i].id === emp.id) { 
        this.employeeList[i].name = emp.name; 
        this.employeeList[i].salary = emp.salary; 
        break; 
      } 
    } 
  } 
 
  public deleteEmployee(id: number | undefined) { 
    let i = 0; 
    for (; i < this.employeeList.length; i++) { 
      if (this.employeeList[i].id === id) { 
        break; 
      } 
    } 
    this.employeeList.splice(i, 1); 
  } 
}
