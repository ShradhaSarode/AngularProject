import { Injectable } from '@angular/core';
import { Employee } from './employee/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    new Employee('John Doe', 'Project A', 'Angular', 'Start'),
    new Employee('Jane Smith', 'Project B', 'React', 'Start'),
    new Employee('Alice Johnson', 'Project C', 'Vue.js', 'Start'),
    new Employee('John Doe', 'Project A', 'Angular', 'Start'),
    new Employee('Jane Smith', 'Project B', 'React', 'Start'),
    new Employee('Alice Johnson', 'Project C', 'Vue.js', 'Start'),
    new Employee('John Doe', 'Project A', 'Angular', 'Start'),
    new Employee('Jane Smith', 'Project B', 'React', 'Start'),
    new Employee('Alice Johnson', 'Project C', 'Vue.js', 'Start'),
    new Employee('John Doe', 'Project A', 'Angular', 'Start'),
    new Employee('Jane Smith', 'Project B', 'React', 'Start'),
    new Employee('Alice Johnson', 'Project C', 'Vue.js', 'Start')
    
  ];

  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }
  updateEmployeeStatus(employeeName: string, newStatus: string) {
    const employee = this.employees.find(emp => emp.name === employeeName);
    if (employee) {
      employee.status = newStatus;
    }
  }
}
