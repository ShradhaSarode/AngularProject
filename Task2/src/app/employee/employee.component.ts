import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from './Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
    employees: Employee[] = [];
  
    constructor(private employeeService: EmployeeService) { }
  
    ngOnInit() {
      this.employees = this.employeeService.getEmployees();
    }
    // changeStatus(employee: Employee, status: string) {
    //   employee.status = status;
    // }
    changeStatus(employee: Employee, newStatus: string) {
      this.employeeService.updateEmployeeStatus(employee.name, newStatus);
    }
}
